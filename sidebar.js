const fs = require('fs');
const path = require('path');

let ignores = /node_modules|^\.|_sidebar|_docsify|_navbar|_coverpage/;
let isDoc = /.md$/;

//removes 1- 2- etc. from directory names
const niceName =(name) => {
  let splitName = name.split(/[-_]/);
  if (Number.isNaN(Number(splitName[0]))) {
    return splitName.map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
  } else {
    return splitName.slice(1).map(string => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
  }
}

const buildTree = (dirPath, name = '', dirLink = '') => {
  let children = [];
  for (let fileName of fs.readdirSync(dirPath)) {
    if (ignores.test(fileName)) continue;

    let fileLink = dirLink + '/' + fileName;
    let filePath = path.join(dirPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      let sub = buildTree(filePath, fileName, fileLink);
      if (sub.children != null && sub.children.length > 0) children.push(sub);
    } else if (isDoc.test(fileName)) {
      children.push({ name: fileName, link: fileLink });
    }
  }

  return { name, children, link: dirLink };
}

const renderToMd = (tree, linkDir = false) => {
  if (!tree.children) {
    return `- [${niceName(path.basename(tree.name, '.md'))}](${tree.link.replace(/ /g, '%20')})`;
  } else {
    let fileNames = new Set(tree.children.filter(c => !c.children).map(c => {
      if(c.name !== 'README.md') {
        return c.name;
      } else {
        return 
      }
    }));
    let dirNames = new Set(tree.children.filter(c => c.children).map(c => c.name + '.md'));

    let content = tree.children
      .filter(c => (!fileNames.has(c.name) || !dirNames.has(c.name)))
      .map(c => renderToMd(c, dirNames.has(c.name + '.md') && fileNames.has(c.name + '.md')))
      .join('\n')
      .split('\n')
      .map(item => '  ' + item)
      .join('\n');
    let prefix = '';

    if (tree.name) {
      if (linkDir || fileNames.has('README.md')) {
       // console.log(fileNames);
        
        let linkPath = tree.link.replace(/ /g, '%20');
        if (fileNames.has('README.md')) linkPath += '/README.md';
        prefix = `- [${niceName(path.basename(tree.name, '.md'))}](${linkPath})\n`;

        //console.log(prefix);
      } else prefix = `- ${niceName(tree.name)}\n`;
    }

    return prefix + content;
  }
}

const generateSidebar = (docsDir) => {

  let dir = docsDir;

  try {
    let root = buildTree(dir);
    console.log(root);
    fs.writeFileSync(path.join(dir, '_sidebar.md'), renderToMd(root));
  } catch (e) {
    console.error('Unable to generate sidebar for directory', dir);
    console.error('Reason:', e.message);
    process.exit(1);
  }
}

generateSidebar(path.join(process.cwd(), 'docs'));
