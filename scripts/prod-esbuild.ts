/**
 * Build main process using ESBuild
 */
import * as path from 'path'
import * as fs from 'fs'
import * as esbuild from 'esbuild'
import { CompileError, mainPath, outDirMain, entryPath } from './common'

function transformErrors(error: esbuild.BuildFailure): CompileError[] {
  const errors = error.errors.map(
    (e): CompileError => {
      return {
        location: e.location,
        message: e.text
      }
    }
  )
  return errors
}

export default async (
  reportError,
  buildStart,
  buildComplete,
  notFoundTSConfig
) => {
  const tsconfigPath = path.join(mainPath, 'tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig()
  }

  try {
    await esbuild.build({
      outdir: outDirMain,
      entryPoints: [entryPath],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'info',
      errorLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: false,
      watch: false
    })
    buildComplete(outDirMain)
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure
      reportError(transformErrors(error))
    }
  }
}
