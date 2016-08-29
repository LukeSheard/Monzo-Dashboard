import {
  css_loader_parser,
  css_modules_loader_parser,
  style_loader_filter,
  style_loader_path_extractor,
} from 'webpack-isomorphic-tools/plugin';

const filter = (module, regex, options, log) => {
  if (options.development) {
    return style_loader_filter(module, regex, options, log);
  }
  return regex.test(module.name)
}

const path = (module, options, log) => {
  if (options.development) {
    return style_loader_path_extractor(module, options, log);
  }
  return module.name;
}

const parser = (loader) => (module, options, log) => {
  if (options.development) {
    return loader(module, options, log);
  }

  return module.source;
}

export const webpackIsomorphicToolsConfig = {
  assets: {
    images: {
      extensions: [
        'png',
        'jpg',
        'gif',
        'ico',
        'svg',
      ],
    },
    sass: {
      extensions: [
        'scss',
      ],
      filter,
      path,
      parser: parser(css_modules_loader_parser),
    },
    css: {
      extensions: [
        'css',
      ],
      filter,
      path,
      parser: parser(css_loader_parser),
    },
  },
};
