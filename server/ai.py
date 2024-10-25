"""
def analyze_meal_image(image_link)

returns the json hopefully
"""

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

    prompt = f"""Analyze this food image and provide detailed nutritional information in the following JSON only. No additional text or explanations.

    just repeat the prompt again just fill in the places where <> is used, dont say anything else. do not say sure here is your json or anything of that sort
    also do not say anyhting at the end like NOTE: or anything

<PROMPT_STARTS_HERE>
{{
    "time": "{current_time}",
    "date": "{current_date}",
    "name": "{meal_type}",
    "imageurl": "{image_link}",
    "items": [
        {{
            "name": "<item_name>",
            "quantity": "<serving size>",
            "calories": <number>,
            "protein": <number>,
            "carbs": <number>,
            "fats": <number>
        }}
    ]
}}
<PROMPT_END_HERE>

Ensure:
1. All nutritional values are numbers (not strings)
2. Each visible food item is listed separately
3. Quantities are realistic serving sizes
4. Nutritional values are accurate estimates
5. DO NOT RESPOND IN MARKDOWN
6. Only respond in JSON
7. <xyz> says fill in the blank

"""
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        },
        data=json.dumps({
            # "model": "meta-llama/llama-3.2-90b-vision-instruct",
            # "model": "google/gemini-pro-vision",
            # "model": "anthropic/claude-3.5-sonnet",
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

# Example usage
# image_link = "https://media-cdn.tripadvisor.com/media/photo-s/0b/12/a2/c3/southern-fried-chicken.jpg"
# result = analyze_meal_image(image_link)

# print(result['choices'][0]['message']['content'])
