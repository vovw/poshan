import requests
import json
import os
from datetime import datetime

def get_meal_type():
    current_hour = datetime.now().hour

    if 5 <= current_hour < 11:
        return "breakfast"
    elif 11 <= current_hour < 16:
        return "lunch"
    elif 16 <= current_hour < 19:
        return "snack"
    elif 19 <= current_hour < 23:
        return "dinner"
    else:
        return "late night snack"

def analyze_meal_image(image_link):
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    current_time = datetime.now().strftime("%H:%M:%S")
    current_date = datetime.now().strftime("%Y-%m-%d")
    meal_type = get_meal_type()

    prompt = f"""Analyze this image and output only a JSON object with this exact structure:
    {{
        "time": "{current_time}",
        "date": "{current_date}",
        "name": "{meal_type}",
        "imageurl": "{image_link}",
        "items": [
            {{
                "name": "item_name",
                "quantity": "the quantity",
                "calories": "the amount calories as a number",
                "protein": "the amount of portien as a number",
                "carbs": "the amount of carbohydrates as a number",
                "fats": "the amount of fats as a number"
            }}
        ]
    }}

    Identify each food item visible in the image and include realistic nutritional values.
    Return only valid JSON, no other text."""

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        },
        data=json.dumps({
            "model": "meta-llama/llama-3.2-90b-vision-instruct",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_link
                            }
                        }
                    ]
                }
            ]
        })
    )

    return response.json()

# Example usage
image_link = "https://i.ibb.co/ch4NrZk/IMG-20241025-213138791-HDR-AE.jpg"
result = analyze_meal_image(image_link)

print(result['choices'][0]['message']['content'])
