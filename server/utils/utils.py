import pytesseract
from pdf2image import convert_from_path
import re

def extract_pdf_text_ocr(file_path: str) -> dict:
    images = convert_from_path(file_path, dpi=300)
    text = ""

    for img in images:
        text += pytesseract.image_to_string(img)

    lines = text.split("\n")
    result = {}
    health_data = {}
    name_found = False

    for line in lines:
        line = line.strip()
        if not line:
            continue

        if ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            if key.lower() == "name":
                result["Name"] = value
                name_found = True
            elif key.lower() == "date":
                result["Date"] = value
            else:
                health_data[key] = {"value": value}
            continue

        if not name_found and re.match(r"^[A-Z][a-z]+\s[A-Z][a-z]+$", line):
            result["Name"] = line
            name_found = True
            continue

        match = re.match(
            r"^(.*?)(\d+[\.,]?\d*\s*(?:mg/dL|g/dL|/uL|million/uL))\s+(\d+[\.,]?\d*)\s*-\s*(\d+[\.,]?\d*)\s*(mg/dL|g/dL|/uL|million/uL)?",
            line
        )
        if match:
            key = match.group(1).strip()
            value = match.group(2).strip()
            min_range = match.group(3)
            max_range = match.group(4)
            unit = match.group(5) if match.group(5) else value.split()[-1]
            range_str = f"{min_range} - {max_range} {unit}"
            health_data[key] = {
                "value": value,
                "range": range_str
            }
            continue

        match = re.match(
            r"^(.*?)(\d+[\.,]?\d*\s*(?:mg/dL|g/dL|/uL|million/uL))\s*([<>=]{1,2})\s*(\d+[\.,]?\d*)\s*(mg/dL|g/dL|/uL|million/uL)?",
            line
        )
        if match:
            key = match.group(1).strip()
            value = match.group(2).strip()
            operator = match.group(3)
            limit = match.group(4)
            unit = match.group(5) if match.group(5) else value.split()[-1]
            range_str = f"{operator} {limit} {unit}"
            health_data[key] = {
                "value": value,
                "range": range_str
            }
            continue

    result["values"] = health_data
    return result