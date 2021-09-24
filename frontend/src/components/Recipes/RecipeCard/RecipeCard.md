### Description

### Example

```jsx
<RecipeCard
  filterTags={{
    basics: true,
    breakfast: true,
    main: true,
    dessert: true,
    drinks: true,
  }}
  recipe={{
    id: 1,
    title: 'Breakfast Recipe',
    referenceReferenceId: {
      id: 1,
      author: {
        id: 1,
        name: 'Breafast Recipe Author',
      },
    },
    recipesCategoryId: {
      id: 1,
      title: 'breakfast',
    },
    generalValueId: {
      id: 1,
      value: 15,
      generalMeasureId: {
        id: 1,
        abbreviation: 'min',
      },
    },
  }}
/>
```
