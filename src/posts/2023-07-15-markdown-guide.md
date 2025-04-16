---
title: Markdown Quick Guide
date: 2023-07-15
draft: true
eleventyExcludeFromCollections: true
---

This post serves as a quick guide to using Markdown in blog posts, including syntax highlighting for code blocks.

## Basic Syntax

### Headers

```
# H1
## H2
### H3
#### H4
```

### Emphasis

```
*italic* or _italic_
**bold** or __bold__
```

### Lists

Unordered:
```
- Item 1
- Item 2
  - Subitem
```

Ordered:
```
1. First
2. Second
3. Third
```

### Links

```
[Link text](https://example.com)
```

### Images

```
![Alt text](image-url.jpg)
```

## Code Blocks with Syntax Highlighting

### JavaScript

```javascript
// A simple JavaScript function
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

// Arrow function
const multiply = (a, b) => a * b;

// Using an object
const person = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'cycling', 'hiking']
};

// Looping through an array
person.hobbies.forEach(hobby => {
  console.log(`${person.name} enjoys ${hobby}`);
});
```

### CSS

```css
/* CSS Variables */
:root {
  --primary-color: #3498db;
  --text-color: #333;
}

/* Styling a class */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: var(--text-color);
}

/* Media query */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Example Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  
  <main>
    <p>This is a <strong>sample</strong> paragraph.</p>
    <button id="btn">Click Me</button>
  </main>
  
  <script src="script.js"></script>
</body>
</html>
```

### Python

```python
# A simple Python class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, my name is {self.name} and I'm {self.age} years old.")

# Creating an instance
john = Person("John", 30)
john.greet()

# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers if n % 2 == 0]
print(squares)  # Output: [4, 16]
```

### JSON

```json
{
  "name": "John Doe",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "555-1234"
    },
    {
      "type": "work",
      "number": "555-5678"
    }
  ]
}
```

## Writing Posts

To create a new post, simply add a new markdown file to the `src/posts/` directory with the appropriate frontmatter and content. You can use any of the syntax shown above, including syntax-highlighted code blocks. 