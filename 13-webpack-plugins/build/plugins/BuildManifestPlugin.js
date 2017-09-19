function BuildManifestPlugin(name) {
    this.name = name + '.json';
}

BuildManifestPlugin.prototype.apply = function (compiler) {

    compiler.plugin('emit', (compiler, callback) => {

        const file = JSON.stringify(compiler.getStats().toJson().assetsByChunkName)

        compiler.assets[this.name] = {
            source : function () {
                return file;
            },
            size: function () {
                return file.length;
            }
        };
        callback();
    });
}

module.exports = BuildManifestPlugin;



/*
//Working version - 2

const fs = require('fs');
const path = require('path');

const fs = require('fs');
const path = require('path');


function BuildManifestPlugin(targetDist) {
    this.targetDist = targetDist;
}

BuildManifestPlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', this.writeManifest.bind(this));
}

BuildManifestPlugin.prototype.writeManifest = function (stats) {
    // todo Найти способ распарсить JSON в HTML
    fs.writeFileSync(
        path.resolve(this.targetDist + '/stats.json'),
        JSON.stringify(stats.toJson().assetsByChunkName)
    );
}


module.exports = BuildManifestPlugin;*/


/*
// Working version - 1

const fs = require('fs');
const path = require('path');

const fs = require('fs');
const path = require('path');


function BuildManifestPlugin(targetDist) {
    this.targetDist = targetDist;
}

BuildManifestPlugin.prototype.apply = function (compiler) {
    // todo Найти способ распарсить JSON в HTML
    compiler.plugin('done', stats => {
        fs.writeFileSync(
            path.resolve( this.targetDist + '/stats.json'),
            JSON.stringify(stats.toJson().assetsByChunkName)
        );
    });
}

module.exports = BuildManifestPlugin;*/