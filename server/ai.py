import requests
import json
import os
from datetime import datetime

def analyze_meal_image(image_link, meal_type):
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    current_time = datetime.now().strftime("%H:%M:%S")
    current_date = datetime.now().strftime("%Y-%m-%d")

    prompt = f"""Analyze this image and output ONLY a JSON object with this exact structure:
    {{
        "id": 1,
        "time": "{current_time}",
        "date": "{current_date}",
        "name": "{meal_type}",
        "imageurl": "{image_link}",
        "items": [
            {{
                "name": "item_name",
                "quantity": "1",
                "calories": "100",
                "protein": "10",
                "carbs": "20",
                "fats": "5"
            }}
        ]
    }}

    Identify each food item visible in the image and include realistic nutritional values.
    Return ONLY valid JSON, no other text."""

    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        },
        data=json.dumps({
            "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
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


image_link = "https://imgmedia.lbb.in/media/2020/02/5e4e23fdf01dbc22ed909b40_1582179325811.jpg"
meal_type = "lunch"
result = analyze_meal_image(image_link, meal_type)

print(result['choices'][0]['message']['content'])
