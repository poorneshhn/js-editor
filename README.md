# js-editor

https://www.npmjs.com/package/js_editor_p

This is a library which lets you write and execute javaScript by launching a javaScript editor on your browser similar to jupyter notebook.

To use, run the below command in your terminal

npx js_editor_p serve

(optional) File name can be provided which will created and the code you type in the editor will be stored on your computer. "notebook.js" will be the default file name

npx js_editor_p serve myfile.js

(optional) Port can be provided manually for the app to run on. By default it runs on 4005

npx js_editor_p serve --port=5000 or npx js_editor_p serve -p 5000

Overall, the app can be launched with custom propertiles like below,

npx js_editor_p serve myfile.js -p 5000

Happy Coding!
