'use strict';

const renderLayout = (app, pageScripts, initialState, hasUser) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
  <link href="/style.css" rel="stylesheet">
  <link href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" rel="stylesheet">
  <link href="//fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">   
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" rel="stylesheet" />
</head>
<body>

  <div id="app">${app}</div>
  <script>
    window.__INITIAL_STATE = ${JSON.stringify(initialState)}
    window.__ENV = "${ process.env.NODE_ENV }";
    window.__USER = ${ hasUser };
  </script>
  ${
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staged'
      ? `
        <script src="/vendor.min.js"></script>
        <script src="/client.min.js"></script>
      `
      : `
        <script src="/vendor.js"></script>
        <script src="/client.js"></script>
      `
  }
  ${ pageScripts }
  ${pageScripts}
</body>
</html>
`

export default renderLayout;
