'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const apolloSsr = require('@vue/apollo-ssr');

const createDebugger = (namespace) => {
  try {
    const debug = require("debug");
    return debug(`nuxt-apollo:${namespace}`);
  } catch (e) {
    return () => void 0;
  }
};

var name = "@miii/nuxt-apollo";

const debug = createDebugger("module");
const nuxtModule = function() {
  this.options.build.transpile = this.options.build.transpile || [];
  this.options.build.transpile.push("@vue/apollo-composable");
  this.options.build.transpile.push(name);
  this.nuxt.hook("vue-renderer:ssr:context", (ssrContext) => {
    const { $apollo, nuxt } = ssrContext;
    if ($apollo) {
      debug("Extracting cache to nuxt state");
      nuxt.apollo = apolloSsr.getStates($apollo);
    } else {
      debug("$apollo was not found on ssrContext, make sure defineApolloClient() is used");
    }
  });
};
const meta = require("../package.json");

exports["default"] = nuxtModule;
exports.meta = meta;
