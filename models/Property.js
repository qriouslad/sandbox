// Generated by CoffeeScript 1.5.0
// Look in node_modules/mongoose/examples/schema.js for examples
(function() {
  var PropertySchema, mongoose, validatePresenceOf;

  mongoose = require("../node_modules/mongoose");

  validatePresenceOf = function(value) {
    return value && value.length;
  };

  PropertySchema = new mongoose.Schema({
    name: {
      type: String,
      validate: [validatePresenceOf, 'a name is required'],
      index: {
        unique: true
      }
    },
    slug: { type: String, lowercase: true, trim: true },
    owner: mongoose.Schema.ObjectId,
    created_on: {
      type: Date,
      "default": Date.now
    }
  });

  /**
   * Plugins
   */

  function slugGenerator (options){
    options = options || {};
    var key = options.key || 'name';

    return function slugGenerator(schema){
      schema.path(key).set(function(v){
        this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
        return v;
      });
    };
  };

  PropertySchema.plugin(slugGenerator());


  exports.Property = mongoose.model('Property', PropertySchema, 'property');

}).call(this);