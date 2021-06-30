# Highlight.js

- Github Repository: [Link](https://github.com/highlightjs/highlight.js)

- Documentation: [Link](https://highlightjs.readthedocs.io/en/latest/theme-guide.html)

- Download page: [Link](https://highlightjs.org/download/)

### Build package
```shell script
gulp
```

### Publish package to NPM package registry
```shell script
npm login
npm publish --access public
```

### Unpublishing a single version of a package
```shell script
npm unpublish <package-name>@<version>
```

### Unpublishing an entire package
```shell script
npm unpublish <package-name> -f
```