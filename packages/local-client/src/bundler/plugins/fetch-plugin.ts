import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPkgPlugin = (inputCode: string) => {
  return {
    name: "fetch-pkg-plugin",
    setup(build: esbuild.PluginBuild) {
        
      build.onLoad({filter:/(^index\.js$)/},(args:any)=>{
          return {
            loader: "jsx",
            contents: inputCode,
          };
      })

      build.onLoad({filter:/.*/}, async (args:any) =>{
          try{
            const cachedRes = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
            if (cachedRes) {
                return cachedRes;
             }
          }catch(err){
              console.log(err);
          }
      })
    
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        try {
          const { data, request } = await axios.get(args.path);
          const fileType = args.path.match(/.css$/) ? "css" : "jsx";
          const contents = handleFileParsing(fileType, data);
          const valToCache: esbuild.OnLoadResult = {
            loader: "jsx",
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };
          await fileCache.setItem(args.path, valToCache);
          return valToCache;
        } catch (err) {
          console.log(err);
        }
      });
    },
  };
};

function handleFileParsing(fileType: 'css' | 'jsx', data: any) {
  const sanitizedCssData = data.replace(/\n/g,'').replace(/"/g,'\\"').replace(/'/g,"\\'");
  const fileTypes = {
    css: `
    const style = document.createElement('style');
    style.innerText = '${sanitizedCssData}';
    document.head.appendChild(style);
`,
    jsx: data,
  };
   return fileTypes[fileType];
}
