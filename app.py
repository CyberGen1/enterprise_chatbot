from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import numpy as np
import io
import base64
import pandasai as pai
import os
import sys
import traceback
from typing import Optional, Dict, Any, List
import json
import uuid
from pathlib import Path
import logging
import matplotlib.pyplot as plt
import seaborn as sns
import requests
from scipy import stats
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Enterprise Chatbot API", 
              description="API for CSV analysis with PandasAI")

# Set up CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a charts directory if it doesn't exist
charts_dir = Path("./charts")
charts_dir.mkdir(exist_ok=True)

# Set PandasAI API key from environment variable or hardcode for development
PANDAS_AI_API_KEY = os.getenv("PANDAS_AI_API_KEY", "your-pandas-ai-api-key")
pai.api_key.set(PANDAS_AI_API_KEY)

# OpenAI API configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

logger.info(f"PandasAI API key set: {'*' * (len(PANDAS_AI_API_KEY) - 4) + PANDAS_AI_API_KEY[-4:] if PANDAS_AI_API_KEY else 'Not set'}")
logger.info(f"OpenAI API key set: {'Yes' if OPENAI_API_KEY else 'No'}")

# Dictionary to store uploaded dataframes
# In a production environment, this should be a database
uploaded_files = {}

class QueryRequest(BaseModel):
    query: str

class FileUploadResponse(BaseModel):
    file_id: str
    filename: str
    columns: List[str]
    rows: int
    preview: Optional[List[Dict[str, Any]]]

# Helper function to call OpenAI API
def call_openai_api(user_query):
    """
    Call the OpenAI API with the user's query
    """
    try:
        logger.info(f"Calling OpenAI API with query: {user_query}")
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPENAI_API_KEY}"
        }
        
        payload = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are an AI assistant that provides clear, concise, and helpful responses. Format your answers with proper markdown when appropriate."},
                {"role": "user", "content": user_query}
            ],
            "temperature": 0.7
        }
        
        response = requests.post(
            OPENAI_API_URL,
            headers=headers,
            json=payload
        )
        
        if response.status_code == 200:
            response_json = response.json()
            content = response_json['choices'][0]['message']['content']
            logger.info(f"OpenAI API response received: {content[:100]}...")
            return content
        else:
            logger.error(f"OpenAI API error: {response.status_code} - {response.text}")
            return f"## Error\n\nI encountered an error processing your request. Please try again later.\n\nDetails: API responded with status code {response.status_code}"
    
    except Exception as e:
        logger.error(f"Error calling OpenAI API: {str(e)}")
        logger.error(traceback.format_exc())
        return f"## Error\n\nI encountered an error processing your request. Please try again later.\n\nDetails: {str(e)}"

# Helper function to generate a basic visualization and save it
def generate_visualization(df, query, file_id):
    """
    Generate a visualization based on the query and data
    Returns a list of file paths to the generated visualizations
    """
    chart_paths = []
    
    # Don't attempt to visualize if there's no data
    if df.empty:
        logger.warning("Cannot generate visualization for empty dataframe")
        return chart_paths
        
    try:
        logger.info(f"Generating visualization for query: {query}")
        
        # Identify numeric and categorical columns
        numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
        categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
        
        if not numeric_cols:
            logger.warning("No numeric columns found for visualization")
            return chart_paths
            
        # Find potential columns to visualize
        mentioned_cols = []
        for col in df.columns:
            if col.lower() in query.lower():
                mentioned_cols.append(col)
                
        # For bar charts
        if any(term in query.lower() for term in ['bar chart', 'bar plot', 'bar graph']):
            try:
                # Choose columns to visualize
                y_col = None
                x_col = None
                
                # Find columns mentioned in query
                for col in mentioned_cols:
                    if col in numeric_cols and not y_col:
                        y_col = col
                    elif col in categorical_cols and not x_col:
                        x_col = col
                
                # If not found, use defaults
                if not y_col and numeric_cols:
                    y_col = numeric_cols[0]  # Use first numeric column
                if not x_col and categorical_cols:
                    x_col = categorical_cols[0]  # Use first categorical column
                
                # If no suitable categorical column, create bins from a numeric column
                if not x_col and len(numeric_cols) > 1:
                    x_col = numeric_cols[1]
                
                # Generate chart
                if x_col and y_col:
                    chart_path = charts_dir / f"{file_id}_bar.png"
                    plt.figure(figsize=(12, 6))
                    
                    if x_col in categorical_cols:
                        # For categorical x, create standard bar chart
                        sns.barplot(data=df, x=x_col, y=y_col)
                        plt.title(f'Bar Chart of {y_col} by {x_col}', fontsize=14)
                    else:
                        # For numeric x, bin the data
                        plt.hist(df[y_col], bins=10, alpha=0.7)
                        plt.title(f'Distribution of {y_col}', fontsize=14)
                    
                    plt.xticks(rotation=45)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created bar chart: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating bar chart: {str(e)}")
                logger.error(traceback.format_exc())
        
        # For histograms
        if any(term in query.lower() for term in ['histogram', 'distribution']):
            try:
                # Choose numeric column to visualize
                col_to_viz = None
                
                # Find numeric column mentioned in query
                for col in mentioned_cols:
                    if col in numeric_cols:
                        col_to_viz = col
                        break
                
                # If not found, use first numeric column
                if not col_to_viz and numeric_cols:
                    col_to_viz = numeric_cols[0]
                
                # Generate chart
                if col_to_viz:
                    chart_path = charts_dir / f"{file_id}_hist.png"
                    plt.figure(figsize=(12, 6))
                    
                    sns.histplot(data=df, x=col_to_viz, kde=True)
                    plt.title(f'Distribution of {col_to_viz}', fontsize=14)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created histogram: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating histogram: {str(e)}")
                logger.error(traceback.format_exc())
        
        # For scatter plots
        if any(term in query.lower() for term in ['scatter plot', 'scatter', 'relationship']):
            try:
                # Choose columns to visualize
                x_col = None
                y_col = None
                
                # Find columns mentioned in query
                for col in mentioned_cols:
                    if col in numeric_cols:
                        if not x_col:
                            x_col = col
                        elif not y_col:
                            y_col = col
                
                # If not found, use default numeric columns
                if not x_col and numeric_cols:
                    x_col = numeric_cols[0]
                if not y_col and len(numeric_cols) > 1:
                    y_col = numeric_cols[1]
                elif not y_col and numeric_cols:
                    y_col = numeric_cols[0]  # Use same column as fallback
                
                # Generate chart
                if x_col and y_col:
                    chart_path = charts_dir / f"{file_id}_scatter.png"
                    plt.figure(figsize=(12, 6))
                    
                    sns.scatterplot(data=df, x=x_col, y=y_col)
                    
                    # Add trendline
                    if "trendline" in query.lower() or "trend" in query.lower():
                        try:
                            # Calculate linear regression
                            slope, intercept, r_value, p_value, std_err = stats.linregress(df[x_col], df[y_col])
                            x = np.array(df[x_col])
                            y = intercept + slope * x
                            plt.plot(x, y, color='red')
                        except Exception as trend_error:
                            logger.error(f"Could not add trendline: {str(trend_error)}")
                    
                    plt.title(f'Scatter Plot of {y_col} vs {x_col}', fontsize=14)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created scatter plot: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating scatter plot: {str(e)}")
                logger.error(traceback.format_exc())
        
        # For pie charts
        if any(term in query.lower() for term in ['pie chart', 'pie']):
            try:
                # Choose categorical column to visualize
                col_to_viz = None
                
                # Find categorical column mentioned in query
                for col in mentioned_cols:
                    if col in categorical_cols:
                        col_to_viz = col
                        break
                
                # If not found, use first categorical column
                if not col_to_viz and categorical_cols:
                    col_to_viz = categorical_cols[0]
                
                # Generate chart
                if col_to_viz:
                    chart_path = charts_dir / f"{file_id}_pie.png"
                    plt.figure(figsize=(10, 10))
                    
                    # Get value counts (limit to top 10 for readability)
                    counts = df[col_to_viz].value_counts().nlargest(10)
                    
                    # If more than 10 categories, add "Other" category
                    if len(df[col_to_viz].unique()) > 10:
                        other_count = df[col_to_viz].value_counts().sum() - counts.sum()
                        counts = pd.concat([counts, pd.Series([other_count], index=["Other"])])
                    
                    # Create pie chart
                    plt.pie(counts, labels=counts.index, autopct='%1.1f%%', startangle=90)
                    plt.title(f'Distribution of {col_to_viz}', fontsize=14)
                    plt.axis('equal')  # Equal aspect ratio
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created pie chart: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating pie chart: {str(e)}")
                logger.error(traceback.format_exc())
        
        # For time series (if a date column is present)
        if any(term in query.lower() for term in ['time series', 'trend', 'over time']):
            try:
                # Look for datetime columns
                date_cols = []
                for col in df.columns:
                    try:
                        # Check if column can be converted to datetime
                        if col not in numeric_cols and pd.to_datetime(df[col], errors='coerce').notna().any():
                            date_cols.append(col)
                    except:
                        pass
                
                # Choose columns to visualize
                date_col = None
                value_col = None
                
                # Find date column mentioned in query
                for col in mentioned_cols:
                    if col in date_cols:
                        date_col = col
                    elif col in numeric_cols:
                        value_col = col
                
                # If not found, use defaults
                if not date_col and date_cols:
                    date_col = date_cols[0]
                if not value_col and numeric_cols:
                    value_col = numeric_cols[0]
                
                # Generate chart
                if date_col and value_col:
                    chart_path = charts_dir / f"{file_id}_timeseries.png"
                    plt.figure(figsize=(12, 6))
                    
                    # Create time series dataframe
                    ts_df = df[[date_col, value_col]].copy()
                    ts_df[date_col] = pd.to_datetime(ts_df[date_col], errors='coerce')
                    ts_df = ts_df.sort_values(by=date_col)
                    
                    plt.plot(ts_df[date_col], ts_df[value_col])
                    plt.title(f'{value_col} over Time', fontsize=14)
                    plt.xticks(rotation=45)
                    plt.grid(True, linestyle='--', alpha=0.7)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created time series plot: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating time series: {str(e)}")
                logger.error(traceback.format_exc())
        
        # If we haven't created any specific visualizations, provide a summary of statistics and correlations
        if not chart_paths:
            try:
                # Create a general summary visualization
                numeric_df = df.select_dtypes(include=np.number)
                
                if not numeric_df.empty and len(numeric_df.columns) >= 2:
                    # Create correlation heatmap
                    chart_path = charts_dir / f"{file_id}_correlation.png"
                    plt.figure(figsize=(12, 10))
                    
                    # Limit to first 10 columns for readability
                    if len(numeric_df.columns) > 10:
                        numeric_df = numeric_df.iloc[:, :10]
                    
                    # Create correlation matrix
                    corr = numeric_df.corr()
                    
                    # Create heatmap
                    sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
                    plt.title('Correlation Matrix of Numeric Variables', fontsize=14)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    chart_paths.append(chart_path)
                    logger.info(f"Created correlation heatmap: {chart_path}")
            except Exception as e:
                logger.error(f"Error creating correlation heatmap: {str(e)}")
                logger.error(traceback.format_exc())
        
        return chart_paths
    except Exception as e:
        logger.error(f"Error in generate_visualization: {str(e)}")
        logger.error(traceback.format_exc())
        return []

@app.post("/upload-csv/", response_model=FileUploadResponse)
async def upload_csv(file: UploadFile = File(...)):
    """
    Upload a CSV file for analysis
    """
    logger.info(f"Received file upload: {file.filename}")
    
    if not file.filename.endswith('.csv'):
        logger.warning(f"Rejected non-CSV file: {file.filename}")
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
    
    try:
        # Read file content
        contents = await file.read()
        
        # Parse CSV
        logger.info(f"Parsing CSV file: {file.filename}")
        df = pd.read_csv(io.BytesIO(contents))
        logger.info(f"Successfully parsed CSV with shape: {df.shape}")
        
        # Generate a unique ID for this file
        file_id = str(uuid.uuid4())
        logger.info(f"Generated file_id: {file_id}")
        
        # Convert to PandasAI DataFrame
        logger.info("Converting to PandasAI DataFrame")
        try:
            pai_df = pai.DataFrame(df.to_dict('records'))
            logger.info("Successfully created PandasAI DataFrame")
        except Exception as e:
            logger.error(f"Error creating PandasAI DataFrame: {str(e)}")
            logger.error(traceback.format_exc())
            # Continue anyway, we'll use raw pandas for fallback
            pai_df = None
        
        # Store in memory - store both pandas and PandasAI versions
        uploaded_files[file_id] = {
            "filename": file.filename,
            "df": df,
            "pai_df": pai_df
        }
        
        # Create preview (first 5 rows)
        preview = df.head(5).to_dict('records')
        
        logger.info(f"File {file.filename} successfully uploaded with ID {file_id}")
        
        return {
            "file_id": file_id,
            "filename": file.filename,
            "columns": df.columns.tolist(),
            "rows": len(df),
            "preview": preview
        }
    
    except Exception as e:
        logger.error(f"Error processing CSV: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing CSV: {str(e)}")

class QueryResponse(BaseModel):
    response: str
    visualization: Optional[str] = None

@app.post("/query-csv/{file_id}", response_model=QueryResponse)
async def query_csv(file_id: str, query_request: QueryRequest):
    """
    Query an uploaded CSV file using PandasAI
    """
    logger.info(f"Received query for file_id: {file_id}")
    logger.info(f"Query: {query_request.query}")
    
    if file_id not in uploaded_files:
        logger.warning(f"File not found: {file_id}")
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        # Get the stored DataFrame
        file_info = uploaded_files[file_id]
        df = file_info["df"]
        pai_df = file_info.get("pai_df")
        query = query_request.query
        filename = file_info["filename"]
        
        # Process visualization requests - if it's asking for a chart, prioritize that
        visualization = None
        visualizations = []
        generate_chart = False
        for term in ['chart', 'plot', 'graph', 'visualization', 'viz', 'show', 'display', 'histogram', 'bar', 'pie', 'trend']:
            if term in query.lower():
                generate_chart = True
                break
        
        # Try to handle common queries using raw pandas operations first
        response = None
        
        # First prepare a context message about the query
        context_intro = f"The language of the original query is English.\n\n"
        context_intro += f"Response (in English): \"The analysis of the uploaded dataset reveals several key insights about the data in {filename}:\n\n"
        
        # Handle average/mean calculations
        if any(term in query.lower() for term in ['average', 'mean', 'avg']):
            try:
                # Try to find which column to average
                col_to_avg = None
                for col in df.columns:
                    if col.lower() in query.lower() and pd.api.types.is_numeric_dtype(df[col]):
                        col_to_avg = col
                        break
                
                if col_to_avg:
                    avg_value = df[col_to_avg].mean()
                    response = f"{context_intro}1. **Average {col_to_avg}**: The average {col_to_avg} of the dataset is approximately **${avg_value:.2f}**.\n\n"
                    
                    # Add some context with a histogram
                    chart_path = charts_dir / f"{file_id}_avg_dist.png"
                    plt.figure(figsize=(10, 6))
                    sns.histplot(data=df, x=col_to_avg, kde=True)
                    plt.axvline(x=avg_value, color='red', linestyle='--', label=f'Mean: {avg_value:.2f}')
                    plt.legend()
                    plt.title(f'Distribution of {col_to_avg} with Mean', fontsize=14)
                    plt.tight_layout()
                    plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                    plt.close()
                    
                    with open(chart_path, "rb") as img_file:
                        img_data = base64.b64encode(img_file.read()).decode("utf-8")
                        visualizations.append(f"data:image/png;base64,{img_data}")
                else:
                    # If no specific column is mentioned, calculate average for all numeric columns
                    numeric_cols = df.select_dtypes(include=np.number)
                    if numeric_cols.empty:
                        response = f"{context_intro}1. **No Numeric Data**: The dataset doesn't contain any numeric columns to calculate averages.\n\n"
                    else:
                        avg_values = numeric_cols.mean()
                        
                        response = f"{context_intro}Here are the average values across different metrics in the dataset:\n\n"
                        
                        for idx, (col, avg) in enumerate(avg_values.items(), 1):
                            response += f"{idx}. **Average {col}**: The average {col} is **{avg:.2f}**.\n\n"
            except Exception as e:
                logger.error(f"Error calculating average: {str(e)}")
                logger.error(traceback.format_exc())
                response = f"{context_intro}1. **Error**: I encountered an error while calculating the average: {str(e)}.\n\n"
        
        # Handle basic statistics requests
        elif any(term in query.lower() for term in ['describe', 'statistics', 'summary', 'stat']):
            try:
                logger.info("Using built-in describe method")
                
                # Only get numeric columns for better readability
                numeric_df = df.select_dtypes(include=np.number)
                
                if numeric_df.empty:
                    response = f"{context_intro}1. **No Numeric Data**: The dataset doesn't contain any numeric columns to calculate statistics.\n\n"
                else:
                    # Format the statistics
                    response = f"{context_intro}"
                    
                    # Generate key insights from the statistics
                    stats = numeric_df.describe()
                    
                    for idx, col in enumerate(numeric_df.columns, 1):
                        col_stats = stats[col]
                        response += f"{idx}. **{col} Statistics**: Values range from ${col_stats['min']:.2f} to ${col_stats['max']:.2f}, with an average of ${col_stats['mean']:.2f}.\n\n"
                    
                    # Generate a boxplot visualization for each numeric column
                    chart_path = charts_dir / f"{file_id}_boxplot.png"
                    plt.figure(figsize=(12, 6))
                    
                    # Only plot first 5 numeric columns for readability
                    cols_to_plot = list(numeric_df.columns)[:5]
                    if cols_to_plot:
                        sns.boxplot(data=numeric_df[cols_to_plot])
                        plt.title('Distribution Across Numeric Columns', fontsize=14)
                        plt.xticks(rotation=45)
                        plt.tight_layout()
                        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                        plt.close()
                        
                        with open(chart_path, "rb") as img_file:
                            img_data = base64.b64encode(img_file.read()).decode("utf-8")
                            visualizations.append(f"data:image/png;base64,{img_data}")
            except Exception as e:
                logger.error(f"Error calculating statistics: {str(e)}")
                logger.error(traceback.format_exc())
                response = f"{context_intro}1. **Error**: I encountered an error while calculating statistics: {str(e)}.\n\n"
        
        # Handle scatter plots specifically (similar to the example image)
        elif any(term in query.lower() for term in ['scatter', 'relationship']):
            try:
                # Try to identify the columns to plot
                numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
                x_col, y_col = None, None
                
                if not numeric_cols or len(numeric_cols) < 2:
                    response = f"{context_intro}1. **Insufficient Numeric Data**: The dataset needs at least two numeric columns to create a scatter plot.\n\n"
                else:
                    # Look for x-axis and y-axis mentions
                    for col in df.columns:
                        if col.lower() in query.lower():
                            if "x-axis" in query.lower() and col.lower() in query.lower().split("x-axis")[1][:20]:
                                x_col = col
                            elif "y-axis" in query.lower() and col.lower() in query.lower().split("y-axis")[1][:20]:
                                y_col = col
                            elif not x_col:
                                x_col = col
                            elif not y_col:
                                y_col = col
                    
                    # If not found, use first two numeric columns
                    if not x_col and len(numeric_cols) > 0:
                        x_col = numeric_cols[0]
                    if not y_col and len(numeric_cols) > 1:
                        y_col = numeric_cols[1]
                    
                    if x_col and y_col and x_col in numeric_cols and y_col in numeric_cols:
                        # Create scatter plot with trendline
                        chart_path = charts_dir / f"{file_id}_scatter.png"
                        plt.figure(figsize=(10, 8))
                        
                        # Create scatter plot
                        sns.scatterplot(data=df, x=x_col, y=y_col, alpha=0.6)
                        
                        # Add trendline if requested
                        if "trendline" in query.lower() or "trend" in query.lower():
                            # Calculate trendline
                            slope, intercept, r_value, p_value, std_err = stats.linregress(df[x_col], df[y_col])
                            x = np.array(df[x_col])
                            y = intercept + slope * x
                            
                            # Add line to plot
                            plt.plot(x, y, color='red')
                        
                        plt.title(f'Scatter Plot of {x_col} vs {y_col}', fontsize=14)
                        plt.xlabel(x_col, fontsize=12)
                        plt.ylabel(y_col, fontsize=12)
                        plt.grid(True, linestyle='--', alpha=0.7)
                        plt.tight_layout()
                        plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                        plt.close()
                        
                        with open(chart_path, "rb") as img_file:
                            img_data = base64.b64encode(img_file.read()).decode("utf-8")
                            visualizations.append(f"data:image/png;base64,{img_data}")
                        
                        # Analyze the relationship
                        corr = df[x_col].corr(df[y_col])
                        relationship = "strong positive" if corr > 0.7 else \
                                      "moderate positive" if corr > 0.3 else \
                                      "weak positive" if corr > 0 else \
                                      "weak negative" if corr > -0.3 else \
                                      "moderate negative" if corr > -0.7 else "strong negative"
                        
                        response = f"{context_intro}1. **Relationship Analysis**: The scatter plot reveals a {relationship} correlation (r = {corr:.4f}) between {x_col} and {y_col}.\n\n"
                        
                        if "trendline" in query.lower() or "trend" in query.lower():
                            response += f"2. **Trend Analysis**: The red trendline shows the overall direction of the relationship. As {x_col} increases, {y_col} tends to {'increase' if slope > 0 else 'decrease'}.\n\n"
                    else:
                        response = f"{context_intro}1. **Column Error**: Could not identify appropriate numeric columns for the scatter plot. Please specify column names in your query.\n\n"
            except Exception as e:
                logger.error(f"Error creating scatter plot: {str(e)}")
                logger.error(traceback.format_exc())
                response = f"{context_intro}1. **Error**: I encountered an error while creating the scatter plot: {str(e)}.\n\n"
        
        # Handle top/head requests
        elif any(term in query.lower() for term in ['top', 'first', 'head']):
            # Try to extract the number of rows requested
            import re
            num_match = re.search(r'\b(\d+)\b', query)
            num = int(num_match.group(1)) if num_match else 5
            logger.info(f"Using built-in head method with {num} rows")
            
            # Limit the columns for display if there are too many
            if len(df.columns) > 8:
                display_df = df.iloc[:, :8].head(num)
                response = f"{context_intro}1. **Top Rows Preview**: Here are the first {num} rows of the dataset (showing only first 8 columns for readability):\n\n"
            else:
                display_df = df.head(num)
                response = f"{context_intro}1. **Top Rows Preview**: Here are the first {num} rows of the dataset:\n\n"
            
            # Add info about the data
            response += f"The dataset contains {len(df)} total rows and {len(df.columns)} columns.\n\n"
        
        # Try PandasAI if available and we haven't handled the query yet
        if response is None and pai_df is not None:
            try:
                logger.info("Attempting to use PandasAI for query")
                pai_response = pai_df.chat(query)
                response = f"{context_intro}{str(pai_response)}"
                logger.info(f"PandasAI response received: {str(pai_response)[:100]}...")
            except Exception as pai_error:
                logger.error(f"PandasAI chat error: {str(pai_error)}")
                logger.error(traceback.format_exc())
                # Continue to fallback
        
        # If we still don't have a response, use a fallback
        if response is None:
            try:
                logger.info("Using fallback response")
                # Simple fallback - just return sample data
                if generate_chart:
                    response = f"{context_intro}1. **Data Visualization**: Here are visualizations based on your query about the dataset.\n\n"
                else:
                    # Try to extract column names from query
                    col_mentioned = None
                    for col in df.columns:
                        if col.lower() in query.lower():
                            col_mentioned = col
                            break
                    
                    if col_mentioned:
                        if col_mentioned in df.select_dtypes(include=np.number).columns:
                            # For numeric columns, provide more detailed stats
                            stats = df[col_mentioned].describe()
                            response = f"{context_intro}1. **{col_mentioned} Analysis**: This numeric column has the following characteristics:\n\n"
                            response += f"   - **Range**: From ${stats['min']:.2f} to ${stats['max']:.2f}\n"
                            response += f"   - **Average**: ${stats['mean']:.2f}\n"
                            response += f"   - **Median**: ${stats['50%']:.2f}\n"
                            response += f"   - **Standard Deviation**: ${stats['std']:.2f}\n\n"
                            
                            # Also add a visualization
                            chart_path = charts_dir / f"{file_id}_col_dist.png"
                            plt.figure(figsize=(10, 6))
                            sns.histplot(data=df, x=col_mentioned, kde=True)
                            plt.title(f'Distribution of {col_mentioned}', fontsize=14)
                            plt.tight_layout()
                            plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                            plt.close()
                            
                            with open(chart_path, "rb") as img_file:
                                img_data = base64.b64encode(img_file.read()).decode("utf-8")
                                visualizations.append(f"data:image/png;base64,{img_data}")
                        else:
                            # For categorical columns, show value counts
                            value_counts = df[col_mentioned].value_counts().head(10)
                            response = f"{context_intro}1. **{col_mentioned} Distribution**: This categorical column has the following distribution:\n\n"
                            
                            # Format as numbered list
                            for idx, (val, count) in enumerate(value_counts.items(), 1):
                                response += f"   - **{val}**: {count} occurrences ({count/len(df)*100:.1f}% of data)\n"
                            response += "\n"
                            
                            # Add a visualization
                            chart_path = charts_dir / f"{file_id}_value_counts.png"
                            plt.figure(figsize=(10, 6))
                            plt.title(f'Top values for {col_mentioned}', fontsize=14)
                            sns.barplot(x=value_counts.index, y=value_counts.values)
                            plt.xticks(rotation=45)
                            plt.tight_layout()
                            plt.savefig(chart_path, dpi=300, bbox_inches='tight')
                            plt.close()
                            
                            with open(chart_path, "rb") as img_file:
                                img_data = base64.b64encode(img_file.read()).decode("utf-8")
                                visualizations.append(f"data:image/png;base64,{img_data}")
                    else:
                        # General dataset info
                        numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
                        categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
                        
                        response = f"{context_intro}1. **Dataset Overview**: The dataset contains {len(df)} records with {len(df.columns)} columns.\n\n"
                        
                        if numeric_cols:
                            response += f"2. **Numeric Columns**: There are {len(numeric_cols)} numeric columns, including {', '.join(numeric_cols[:3])}{'...' if len(numeric_cols) > 3 else ''}.\n\n"
                        
                        if categorical_cols:
                            response += f"3. **Categorical Columns**: There are {len(categorical_cols)} categorical columns, including {', '.join(categorical_cols[:3])}{'...' if len(categorical_cols) > 3 else ''}.\n\n"
            except Exception as e:
                logger.error(f"Error in fallback response: {str(e)}")
                logger.error(traceback.format_exc())
                response = f"{context_intro}1. **Error**: I encountered an error while analyzing your data: {str(e)}.\n\n"
        
        # Generate visualizations if requested or if we haven't added any yet
        if (generate_chart or not visualizations) and "no chart" not in query.lower():
            chart_paths = generate_visualization(df, query, file_id)
            if chart_paths:
                for chart_path in chart_paths:
                    try:
                        with open(chart_path, "rb") as img_file:
                            img_data = base64.b64encode(img_file.read()).decode("utf-8")
                            visualizations.append(f"data:image/png;base64,{img_data}")
                    except Exception as e:
                        logger.error(f"Error encoding image {chart_path}: {str(e)}")
                        logger.error(traceback.format_exc())
        
        # Add closing quote to the response
        if response and context_intro in response:
            response += '"'
        
        # Combine all visualizations into a single string with markers
        visualization_data = None
        if visualizations:
            # Join visualizations with a special marker that the frontend will use to split them
            visualization_data = "||VISUALIZATION_SEPARATOR||".join(visualizations)
            
            # Always let the user know how many visualizations were generated
            num_visualizations = len(visualizations)
            viz_word = "visualization" if num_visualizations == 1 else "visualizations"
            
            # Add information about visualizations if not already in response
            if response and "visualization" not in response.lower():
                response = f"{response}\n\n**{num_visualizations} {viz_word} generated based on your request**"
            elif not response:
                response = f"{context_intro}**{num_visualizations} {viz_word} generated based on your request**"
        
        logger.info(f"Successfully processed query with {len(visualizations)} visualizations")
        return {
            "response": response,
            "visualization": visualization_data
        }
    
    except Exception as e:
        logger.error(f"Error querying CSV: {str(e)}")
        logger.error(traceback.format_exc())
        # Return a more user-friendly error
        return {
            "response": f"## Error Processing Query\n\nI encountered an error while analyzing your data. Please try a simpler query or different data format.\n\nDetails: {str(e)}",
            "visualization": None
        }

@app.post("/generate-response/")
async def generate_response(query_request: QueryRequest):
    """
    Handle regular chat messages using OpenAI API
    """
    logger.info(f"Received chat message: {query_request.query}")
    try:
        # Call OpenAI API for a response
        response = call_openai_api(query_request.query)
        
        # Return the response
        return {"response": response}
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        logger.error(traceback.format_exc())
        # Return a more user-friendly error
        return {
            "response": f"## Error Processing Query\n\nI encountered an error while processing your request. Please try again later.\n\nDetails: {str(e)}"
        }

@app.get("/")
async def root():
    """
    Health check endpoint
    """
    return {"status": "ok", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server on http://0.0.0.0:8000")
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True) 