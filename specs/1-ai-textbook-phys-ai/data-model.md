# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### Textbook Module
- **ID**: Unique identifier for the module
- **Title**: The name of the module (e.g., "Physical AI Fundamentals")
- **Description**: Brief overview of what the module covers
- **Learning Objectives**: List of skills/knowledge students should gain
- **Content Sections**: Array of content sections that comprise the module
- **Prerequisites**: Other modules or knowledge required before starting
- **Estimated Duration**: Time needed to complete the module
- **Curriculum Alignment**: Mapping to specific curriculum requirements

### Content Section
- **ID**: Unique identifier for the section
- **Module ID**: Reference to the parent module
- **Title**: The name of the section
- **Content Type**: Text, diagram, video, interactive element, etc.
- **Body**: The actual content in Markdown/MDX format
- **Learning Objectives**: Specific goals for this section
- **Key Terms**: Vocabulary terms defined in this section
- **Visual Elements**: Links to diagrams, charts, etc.
- **Assessment Questions**: Questions to test understanding

### Visual Element
- **ID**: Unique identifier for the visual element
- **Type**: Diagram, chart, illustration, photo, etc.
- **Description**: Alt text and description for accessibility
- **Source File**: Path to the image/file in the static directory
- **Associated Content**: Reference to the content section that uses this element

### Learning Objective
- **ID**: Unique identifier for the objective
- **Text**: Clear statement of what the learner should be able to do
- **Module ID**: Reference to the module this objective belongs to
- **Curriculum Standard**: Mapping to specific curriculum requirements
- **Assessment Type**: How this objective will be evaluated

## Relationships

- A **Textbook Module** contains multiple **Content Sections**
- A **Content Section** may reference multiple **Visual Elements**
- A **Content Section** has multiple **Learning Objectives**
- A **Textbook Module** has multiple **Learning Objectives**
- A **Learning Objective** maps to a specific **Curriculum Standard**

## Validation Rules

- Each **Textbook Module** must have at least one **Content Section**
- Each **Content Section** must have a unique title within its module
- All **Learning Objectives** must be specific, measurable, and achievable
- **Content Sections** must be ordered sequentially within each **Module**
- **Visual Elements** must include appropriate alt text for accessibility