// api/generate.js
import fs from 'fs';
import path from 'path';

const generateRoute = async (action, modelName) => {
  const scriptPath = new URL(import.meta.url).pathname;
  const scriptDirectory = path.dirname(scriptPath);

  const controllerFileName = path.join(
    scriptDirectory,
    'controllers',
    `${modelName}.controller.js`
  );
  const routeFileName = path.join(scriptDirectory, 'routes', `${modelName}.route.js`);

  // Check if the controller file exists
  if (!fs.existsSync(controllerFileName)) {
    // If the controller file doesn't exist, create a new one
    fs.writeFileSync(controllerFileName, '');
  }

  // Read existing controller file
  let controllerFileContent = await fs.promises.readFile(controllerFileName, 'utf8');

  // Convert action and modelName to camelCase
  const camelCaseAction = action.charAt(0).toLowerCase() + action.slice(1);
  const camelCaseModelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);

  // Update controller file content
  const camelCaseFunctionName = `${camelCaseAction}${camelCaseModelName.charAt(0).toUpperCase()}${camelCaseModelName.slice(1)}`;
  controllerFileContent += `\n\nexport const ${camelCaseFunctionName} = async (req, res, next) => {\n  // Implement your logic here\n};\n`;

  // Write back to the controller file
  await fs.promises.writeFile(controllerFileName, controllerFileContent);

  // Read existing route file
  let routeFileContent = '';

  // Check if the route file already exists
  if (fs.existsSync(routeFileName)) {
    // If the route file exists, read its content
    routeFileContent = await fs.promises.readFile(routeFileName, 'utf8');

    // Check if the route already exists
    const routeRegex = new RegExp(`router.${camelCaseAction}\\("/${camelCaseAction.toLowerCase()}/:id", ${camelCaseFunctionName}\\);`);
    if (!routeRegex.test(routeFileContent)) {
      // Add the new route only if it doesn't exist
      routeFileContent = routeFileContent.replace(/\bexport\s+default\s+router;/, `router.${camelCaseAction}("/${camelCaseAction.toLowerCase()}/:id", ${camelCaseFunctionName});\n\nexport default router;`);
    }
  } else {
    // If the route file doesn't exist, create a new one
    routeFileContent = `import express from 'express';\nconst router = express.Router();\n\n`;
    routeFileContent += `router.${camelCaseAction}("/${camelCaseAction.toLowerCase()}/:id", ${camelCaseFunctionName});\n\nexport default router;`;
  }

  // Write back to the route file
  await fs.promises.writeFile(routeFileName, routeFileContent);

  console.log(
    `Route and controller for ${camelCaseFunctionName} generated successfully.`
  );
};

// Example usage: node generate.js get product
const action = process.argv[2];
const modelName = process.argv[3];

generateRoute(action, modelName);
