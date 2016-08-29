import {
  css_loader_parser,
  css_modules_loader_parser,
  style_loader_filter,
  style_loader_path_extractor,
} from 'webpack-isomorphic-tools/plugin';

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
      filter: function(module, regex, options, log) {
        if (options.development) {
          return style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name)
      },
      path: function(module, options, log) {
        if (options.development) {
          return style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser: function(module, options, log) {
        if (options.development) {
          return css_modules_loader_parser(module, options, log);
        }

        return module.source;
      },
    },
    css: {
      extensions: [
        'css',
      ],
      filter: function(module, regex, options, log) {
        if (options.development) {
          return style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name)
      },
      path: function(module, options, log) {
        if (options.development) {
          return style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser: function(module, options, log) {
        if (options.development) {
          return css_loader_parser(module, options, log);
        }

        return module.source;
      },
    },
  },
};
