/* eslint-env node */

const packageJSON = require( './package.json' );
if ( packageJSON.version !== packageJSON.dependencies.ckeditor5 ) {
	throw new Error( 'Expect "version" and "dependencies.ckeditor5" in package.json to be the same' );
}

const { existsSync, rmSync, mkdirSync, cpSync } = require( 'fs' );
const { resolve, join } = require( 'path' );

const consumerDirectory = '../../../tw-frontend';
if ( !existsSync( consumerDirectory ) ) {
	throw new Error( 'Expect ' + resolve( consumerDirectory ) + ' to exist' );
}

const clientDirectory = join( consumerDirectory, 'client' );
const moduleDirectory = join( 'node_modules/@taskworld/ckeditor5' );

console.log( 'Emptying the target directory...' );
rmSync( resolve( consumerDirectory, moduleDirectory ), { recursive: true, force: true, retryDelay: 1500 } );
rmSync( resolve( clientDirectory, moduleDirectory ), { recursive: true, force: true, retryDelay: 1500 } );
mkdirSync( resolve( consumerDirectory, moduleDirectory ) );

const pathList = [
	'package.json',
	packageJSON.main,
	...packageJSON.files
];
for ( const path of pathList ) {
	console.log( 'Copying', path );
	cpSync( path, resolve( consumerDirectory, moduleDirectory, path ), { recursive: true } );
}

console.log( 'Updated', resolve( consumerDirectory, moduleDirectory ) );

const { spawn } = require( 'child_process' );
console.log( `Running "pnpm run dev" in ${ clientDirectory.replace( /^(\.\.\/)*/g, '' ) }` );
spawn( 'pnpm',
	[ 'run', 'dev', '--force' ],
	{ cwd: resolve( clientDirectory ), shell: true, stdio: 'inherit' }
);
