import os
import pandas as pd
import pandasai as pai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment
api_key = os.getenv("PANDAS_AI_API_KEY", "your-pandas-ai-api-key")
print(f"Using API key: {'*' * (len(api_key) - 4) + api_key[-4:] if api_key else 'Not set'}")

try:
    # Set the API key
    pai.api_key.set(api_key)
    
    # Create a simple DataFrame
    data = {
        "country": ["United States", "United Kingdom", "France", "Germany", "Italy"],
        "revenue": [5000, 3200, 2900, 4100, 2300]
    }
    
    # Convert to pandas DataFrame
    df = pd.DataFrame(data)
    print("Created pandas DataFrame:")
    print(df)
    
    # Convert to PandasAI DataFrame
    pai_df = pai.DataFrame(data)
    print("\nConverted to PandasAI DataFrame successfully")
    
    # Test a simple query
    print("\nTesting a simple query...")
    response = pai_df.chat("What is the country with the highest revenue?")
    print(f"\nQuery result: {response}")
    
    print("\nPandasAI test completed successfully")
    
except Exception as e:
    print(f"Error testing PandasAI: {str(e)}")
    import traceback
    traceback.print_exc() 