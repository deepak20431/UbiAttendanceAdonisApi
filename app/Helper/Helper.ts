
function toCamelCase(str: string): string {
    return str
      .toLowerCase()
      .split(/[-_ ]+/) // Split by hyphens, underscores, or spaces
      .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  const myString = 'hello_world_example';
  const camelCaseString = toCamelCase(myString);
  console.log(camelCaseString); // Output: "helloWorldExample"