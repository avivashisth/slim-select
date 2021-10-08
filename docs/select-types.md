# Single Select
```javascript
new SlimSelect({
  select: '#single'
})
```
```html
<!-- Options -->
<select id="single">
  <option value="value 1">Value 1</option>
  <option value="value 2">Value 2</option>
  <option value="value 3">Value 3</option>
</select>

<!-- Optgroups -->
<select id="single-optgroups">
  <optgroup label="Label 1">
    <option value="value 1">Value 1</option>
    <option value="value 2">Value 2</option>
    <option value="value 3">Value 3</option>
  </optgroup>
  <optgroup label="Label 2">
    <option value="value 21">Value 1</option>
    <option value="value 22">Value 2</option>
    <option value="value 23">Value 3</option>
  </optgroup>
</select>
```

# Multi-Select
```javascript
new SlimSelect({
  select: '#multiple'
})
```
```html
<!-- Options -->
<select id="multiple" multiple>
  <option value="value 1">Value 1</option>
  <option value="value 2">Value 2</option>
  <option value="value 3">Value 3</option>
</select>

<!-- Optgroups -->
<select id="multiple-optgroups" multiple>
  <optgroup label="Label 1">
    <option value="value 1">Value 1</option>
    <option value="value 2">Value 2</option>
    <option value="value 3">Value 3</option>
  </optgroup>
  <optgroup label="Label 2">
    <option value="value 21">Value 1</option>
    <option value="value 22">Value 2</option>
    <option value="value 23">Value 3</option>
  </optgroup>
</select>
```