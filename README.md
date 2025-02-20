[//]: # ( )
[//]: # (This file is automatically generated by a `metapak`)
[//]: # (module. Do not change it  except between the)
[//]: # (`content:start/end` flags, your changes would)
[//]: # (be overridden.)
[//]: # ( )
# http-auth-utils
> Parse, build and deal with HTTP authorization headers.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nfroidure/http-auth-utils/blob/master/LICENSE)
[![Build status](https://travis-ci.com/nfroidure/http-auth-utils.svg?branch=master)](https://travis-ci.com/github/nfroidure/http-auth-utils)
[![Coverage Status](https://coveralls.io/repos/github/nfroidure/http-auth-utils/badge.svg?branch=master)](https://coveralls.io/github/nfroidure/http-auth-utils?branch=master)


[//]: # (::contents:start)

This library provide several utilities to parse and build WWW-Authenticate and
Authorization headers as described per the HTTP RFC.

It is intended to be framework agnostic and could be used either on the server
and the client side. It is also pure functions only, no side effect here. The
functions are synchronous since only parsing headers of small size so no need
for streams or anything asynchronous.

The module is easily extensible with new mechanisms, one very common way to
extend it is to create a `FAKE_TOKEN` mechanism for development only that allows
to directly provide the userId that should be authenticated. You can find
[an sample implementation](https://github.com/nfroidure/whook/blob/master/packages/whook-example/src/services/MECHANISMS.ts)
in the Whook's framework repository.

[//]: # (::contents:end)

# API
## Modules

<dl>
<dt><a href="#module_http-auth-utils">http-auth-utils</a></dt>
<dd></dd>
<dt><a href="#module_http-auth-utils/mechanisms/basic">http-auth-utils/mechanisms/basic</a></dt>
<dd></dd>
<dt><a href="#module_http-auth-utils/mechanisms/bearer">http-auth-utils/mechanisms/bearer</a></dt>
<dd></dd>
<dt><a href="#module_http-auth-utils/mechanisms/digest">http-auth-utils/mechanisms/digest</a></dt>
<dd></dd>
</dl>

<a name="module_http-auth-utils"></a>

## http-auth-utils

* [http-auth-utils](#module_http-auth-utils)
    * _static_
        * [.mechanisms](#module_http-auth-utils.mechanisms) : <code>Object</code>
    * _inner_
        * [~mechanisms](#module_http-auth-utils..mechanisms) : <code>Array</code>
        * [~parseWWWAuthenticateHeader(header, [authMechanisms], [options])](#module_http-auth-utils..parseWWWAuthenticateHeader) ⇒ <code>Object</code>
        * [~parseAuthorizationHeader(header, [authMechanisms], [options])](#module_http-auth-utils..parseAuthorizationHeader) ⇒ <code>Object</code>
        * [~buildWWWAuthenticateHeader(authMechanism, The)](#module_http-auth-utils..buildWWWAuthenticateHeader) ⇒ <code>string</code>
        * [~buildAuthorizationHeader(authMechanism, The)](#module_http-auth-utils..buildAuthorizationHeader) ⇒ <code>string</code>

<a name="module_http-auth-utils.mechanisms"></a>

### http-auth-utils.mechanisms : <code>Object</code>
Basic authentication mechanism.

**Kind**: static property of [<code>http-auth-utils</code>](#module_http-auth-utils)  
**See**: [http-auth-utils/mechanisms/basic](#module_http-auth-utils/mechanisms/basic)  
<a name="module_http-auth-utils..mechanisms"></a>

### http-auth-utils~mechanisms : <code>Array</code>
Natively supported authentication mechanisms.

**Kind**: inner constant of [<code>http-auth-utils</code>](#module_http-auth-utils)  
<a name="module_http-auth-utils..parseWWWAuthenticateHeader"></a>

### http-auth-utils~parseWWWAuthenticateHeader(header, [authMechanisms], [options]) ⇒ <code>Object</code>
Parse HTTP WWW-Authenticate header contents.

**Kind**: inner method of [<code>http-auth-utils</code>](#module_http-auth-utils)  
**Returns**: <code>Object</code> - Result of the contents parse.  
**Api**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| header | <code>string</code> |  | The WWW-Authenticate header contents |
| [authMechanisms] | <code>Array</code> | <code>[BASIC, DIGEST, BEARER]</code> | Allow providing custom authentication mechanisms. |
| [options] | <code>Object</code> |  | Parsing options |
| [options.strict] | <code>boolean</code> | <code>true</code> | Strictly detect the mechanism type (case sensitive) |

**Example**  
```js
assert.deepEqual(
  parseWWWAuthenticateHeader('Basic realm="test"'), {
    type: 'Basic',
    data: {
      realm: 'test'
    }
  }
);
```
<a name="module_http-auth-utils..parseAuthorizationHeader"></a>

### http-auth-utils~parseAuthorizationHeader(header, [authMechanisms], [options]) ⇒ <code>Object</code>
Parse HTTP Authorization header contents.

**Kind**: inner method of [<code>http-auth-utils</code>](#module_http-auth-utils)  
**Returns**: <code>Object</code> - Result of the contents parse.  
**Api**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| header | <code>string</code> |  | The Authorization header contents |
| [authMechanisms] | <code>Array</code> | <code>[BASIC, DIGEST, BEARER]</code> | Allow custom authentication mechanisms. |
| [options] | <code>Object</code> |  | Parsing options |
| [options.strict] | <code>boolean</code> | <code>true</code> | Strictly detect the mechanism type (case sensitive) |

**Example**  
```js
assert.deepEqual(
  parseAuthorizationHeader('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='), {
    type: 'Basic',
    data: {
      hash: 'QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
    }
  }
);
```
<a name="module_http-auth-utils..buildWWWAuthenticateHeader"></a>

### http-auth-utils~buildWWWAuthenticateHeader(authMechanism, The) ⇒ <code>string</code>
Build HTTP WWW-Authenticate header value.

**Kind**: inner method of [<code>http-auth-utils</code>](#module_http-auth-utils)  
**Returns**: <code>string</code> - The header value.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| authMechanism | <code>Object</code> | The mechanism to use |
| The | <code>Object</code> | WWW-Authenticate header contents to base the value on. |

**Example**  
```js
assert.deepEqual(
  buildWWWAuthenticateHeader(BASIC, {
    realm: 'test'
  }),
  'Basic realm="test"'
);
```
<a name="module_http-auth-utils..buildAuthorizationHeader"></a>

### http-auth-utils~buildAuthorizationHeader(authMechanism, The) ⇒ <code>string</code>
Build HTTP Authorization header value.

**Kind**: inner method of [<code>http-auth-utils</code>](#module_http-auth-utils)  
**Returns**: <code>string</code> - The header value.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| authMechanism | <code>Object</code> | The mechanism to use |
| The | <code>Object</code> | Authorization header contents to base the value on. |

**Example**  
```js
assert.deepEqual(
  buildAuthorizationHeader(BASIC, {
    realm: 'test'
  }),
  'Basic realm="test"'
);
```
<a name="module_http-auth-utils/mechanisms/basic"></a>

## http-auth-utils/mechanisms/basic

* [http-auth-utils/mechanisms/basic](#module_http-auth-utils/mechanisms/basic)
    * [~BASIC](#module_http-auth-utils/mechanisms/basic..BASIC) : <code>Object</code>
        * [.type](#module_http-auth-utils/mechanisms/basic..BASIC.type) : <code>String</code>
        * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/basic..BASIC.parseWWWAuthenticateRest) ⇒ <code>Object</code>
        * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/basic..BASIC.buildWWWAuthenticateRest) ⇒ <code>String</code>
        * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/basic..BASIC.parseAuthorizationRest) ⇒ <code>Object</code>
        * [.buildAuthorizationRest(content)](#module_http-auth-utils/mechanisms/basic..BASIC.buildAuthorizationRest) ⇒ <code>String</code>
        * [.computeHash(credentials)](#module_http-auth-utils/mechanisms/basic..BASIC.computeHash) ⇒ <code>String</code>
        * [.decodeHash(hash)](#module_http-auth-utils/mechanisms/basic..BASIC.decodeHash) ⇒ <code>Object</code>

<a name="module_http-auth-utils/mechanisms/basic..BASIC"></a>

### http-auth-utils/mechanisms/basic~BASIC : <code>Object</code>
Basic authentication mechanism.

**Kind**: inner constant of [<code>http-auth-utils/mechanisms/basic</code>](#module_http-auth-utils/mechanisms/basic)  
**See**: http://tools.ietf.org/html/rfc2617#section-2  

* [~BASIC](#module_http-auth-utils/mechanisms/basic..BASIC) : <code>Object</code>
    * [.type](#module_http-auth-utils/mechanisms/basic..BASIC.type) : <code>String</code>
    * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/basic..BASIC.parseWWWAuthenticateRest) ⇒ <code>Object</code>
    * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/basic..BASIC.buildWWWAuthenticateRest) ⇒ <code>String</code>
    * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/basic..BASIC.parseAuthorizationRest) ⇒ <code>Object</code>
    * [.buildAuthorizationRest(content)](#module_http-auth-utils/mechanisms/basic..BASIC.buildAuthorizationRest) ⇒ <code>String</code>
    * [.computeHash(credentials)](#module_http-auth-utils/mechanisms/basic..BASIC.computeHash) ⇒ <code>String</code>
    * [.decodeHash(hash)](#module_http-auth-utils/mechanisms/basic..BASIC.decodeHash) ⇒ <code>Object</code>

<a name="module_http-auth-utils/mechanisms/basic..BASIC.type"></a>

#### BASIC.type : <code>String</code>
The Basic auth mechanism prefix.

**Kind**: static property of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
<a name="module_http-auth-utils/mechanisms/basic..BASIC.parseWWWAuthenticateRest"></a>

#### BASIC.parseWWWAuthenticateRest(rest) ⇒ <code>Object</code>
Parse the WWW Authenticate header rest.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix). |

**Example**  
```js
assert.deepEqual(
  BASIC.parseWWWAuthenticateRest('realm="perlinpinpin"'), {
    realm: 'perlinpinpin'
  }
);
```
<a name="module_http-auth-utils/mechanisms/basic..BASIC.buildWWWAuthenticateRest"></a>

#### BASIC.buildWWWAuthenticateRest(data) ⇒ <code>String</code>
Build the WWW Authenticate header rest.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>String</code> - The built rest.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  BASIC.buildWWWAuthenticateRest({
    realm: 'perlinpinpin'
  }),
  'realm="perlinpinpin"'
);
```
<a name="module_http-auth-utils/mechanisms/basic..BASIC.parseAuthorizationRest"></a>

#### BASIC.parseAuthorizationRest(rest) ⇒ <code>Object</code>
Parse the Authorization header rest.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation {hash}.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix).) |

**Example**  
```js
assert.deepEqual(
  BASIC.parseAuthorizationRest('QWxpIEJhYmE6b3BlbiBzZXNhbWU='), {
    hash: 'QWxpIEJhYmE6b3BlbiBzZXNhbWU=',
    username: 'Ali Baba',
    password: 'open sesame'
  }
);
```
<a name="module_http-auth-utils/mechanisms/basic..BASIC.buildAuthorizationRest"></a>

#### BASIC.buildAuthorizationRest(content) ⇒ <code>String</code>
Build the Authorization header rest.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>String</code> - The rest built.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  BASIC.buildAuthorizationRest({
    hash: 'QWxpIEJhYmE6b3BlbiBzZXNhbWU='
  }),
  'QWxpIEJhYmE6b3BlbiBzZXNhbWU='
);
```
<a name="module_http-auth-utils/mechanisms/basic..BASIC.computeHash"></a>

#### BASIC.computeHash(credentials) ⇒ <code>String</code>
Compute the Basic authentication hash from the given credentials.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>String</code> - The hash representing the credentials.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Object</code> | The credentials to encode {username, password}. |

**Example**  
```js
assert.equal(
  BASIC.computeHash({
    username: 'Ali Baba',
    password: 'open sesame'
  }),
  'QWxpIEJhYmE6b3BlbiBzZXNhbWU='
);
```
<a name="module_http-auth-utils/mechanisms/basic..BASIC.decodeHash"></a>

#### BASIC.decodeHash(hash) ⇒ <code>Object</code>
Decode the Basic hash and return the corresponding credentials.

**Kind**: static method of [<code>BASIC</code>](#module_http-auth-utils/mechanisms/basic..BASIC)  
**Returns**: <code>Object</code> - Object representing the credentials {username, password}.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>String</code> | The hash. |

**Example**  
```js
assert.deepEqual(
  BASIC.decodeHash('QWxpIEJhYmE6b3BlbiBzZXNhbWU='), {
    username: 'Ali Baba',
    password: 'open sesame'
  }
);
```
<a name="module_http-auth-utils/mechanisms/bearer"></a>

## http-auth-utils/mechanisms/bearer

* [http-auth-utils/mechanisms/bearer](#module_http-auth-utils/mechanisms/bearer)
    * [~BEARER](#module_http-auth-utils/mechanisms/bearer..BEARER) : <code>Object</code>
        * [.type](#module_http-auth-utils/mechanisms/bearer..BEARER.type) : <code>String</code>
        * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/bearer..BEARER.parseWWWAuthenticateRest) ⇒ <code>Object</code>
        * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/bearer..BEARER.buildWWWAuthenticateRest) ⇒ <code>String</code>
        * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/bearer..BEARER.parseAuthorizationRest) ⇒ <code>Object</code>
        * [.buildAuthorizationRest(content)](#module_http-auth-utils/mechanisms/bearer..BEARER.buildAuthorizationRest) ⇒ <code>String</code>

<a name="module_http-auth-utils/mechanisms/bearer..BEARER"></a>

### http-auth-utils/mechanisms/bearer~BEARER : <code>Object</code>
Bearer authentication mechanism.

**Kind**: inner constant of [<code>http-auth-utils/mechanisms/bearer</code>](#module_http-auth-utils/mechanisms/bearer)  
**See**: https://tools.ietf.org/html/rfc6750#section-3  

* [~BEARER](#module_http-auth-utils/mechanisms/bearer..BEARER) : <code>Object</code>
    * [.type](#module_http-auth-utils/mechanisms/bearer..BEARER.type) : <code>String</code>
    * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/bearer..BEARER.parseWWWAuthenticateRest) ⇒ <code>Object</code>
    * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/bearer..BEARER.buildWWWAuthenticateRest) ⇒ <code>String</code>
    * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/bearer..BEARER.parseAuthorizationRest) ⇒ <code>Object</code>
    * [.buildAuthorizationRest(content)](#module_http-auth-utils/mechanisms/bearer..BEARER.buildAuthorizationRest) ⇒ <code>String</code>

<a name="module_http-auth-utils/mechanisms/bearer..BEARER.type"></a>

#### BEARER.type : <code>String</code>
The Bearer auth mechanism prefix.

**Kind**: static property of [<code>BEARER</code>](#module_http-auth-utils/mechanisms/bearer..BEARER)  
<a name="module_http-auth-utils/mechanisms/bearer..BEARER.parseWWWAuthenticateRest"></a>

#### BEARER.parseWWWAuthenticateRest(rest) ⇒ <code>Object</code>
Parse the WWW Authenticate header rest.

**Kind**: static method of [<code>BEARER</code>](#module_http-auth-utils/mechanisms/bearer..BEARER)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix). |

**Example**  
```js
assert.deepEqual(
  BEARER.parseWWWAuthenticateRest(
    'realm="testrealm@host.com", ' +
    'scope="openid profile email"'
  ), {
    realm: 'testrealm@host.com',
    scope: 'openid profile email',
  }
);
```
<a name="module_http-auth-utils/mechanisms/bearer..BEARER.buildWWWAuthenticateRest"></a>

#### BEARER.buildWWWAuthenticateRest(data) ⇒ <code>String</code>
Build the WWW Authenticate header rest.

**Kind**: static method of [<code>BEARER</code>](#module_http-auth-utils/mechanisms/bearer..BEARER)  
**Returns**: <code>String</code> - The built rest.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  BEARER.buildWWWAuthenticateRest({
    realm: 'testrealm@host.com',
    error: 'invalid_request',
    error_description: 'The access token expired',
  }),
  'realm="testrealm@host.com", ' +
  'error="invalid_request", ' +
  'error_description="The access token expired"'
);
```
<a name="module_http-auth-utils/mechanisms/bearer..BEARER.parseAuthorizationRest"></a>

#### BEARER.parseAuthorizationRest(rest) ⇒ <code>Object</code>
Parse the Authorization header rest.

**Kind**: static method of [<code>BEARER</code>](#module_http-auth-utils/mechanisms/bearer..BEARER)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation {hash}.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix).) |

**Example**  
```js
assert.deepEqual(
  BEARER.parseAuthorizationRest('mF_9.B5f-4.1JqM'), {
    hash: 'mF_9.B5f-4.1JqM',
  }
);
```
<a name="module_http-auth-utils/mechanisms/bearer..BEARER.buildAuthorizationRest"></a>

#### BEARER.buildAuthorizationRest(content) ⇒ <code>String</code>
Build the Authorization header rest.

**Kind**: static method of [<code>BEARER</code>](#module_http-auth-utils/mechanisms/bearer..BEARER)  
**Returns**: <code>String</code> - The rest built.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  BEARER.buildAuthorizationRest({
    hash: 'mF_9.B5f-4.1JqM'
  }),
  'mF_9.B5f-4.1JqM=='
);
```
<a name="module_http-auth-utils/mechanisms/digest"></a>

## http-auth-utils/mechanisms/digest

* [http-auth-utils/mechanisms/digest](#module_http-auth-utils/mechanisms/digest)
    * [~DIGEST](#module_http-auth-utils/mechanisms/digest..DIGEST) : <code>Object</code>
        * [.type](#module_http-auth-utils/mechanisms/digest..DIGEST.type) : <code>String</code>
        * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/digest..DIGEST.parseWWWAuthenticateRest) ⇒ <code>Object</code>
        * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.buildWWWAuthenticateRest) ⇒ <code>String</code>
        * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/digest..DIGEST.parseAuthorizationRest) ⇒ <code>Object</code>
        * [.buildAuthorizationRest(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.buildAuthorizationRest) ⇒ <code>String</code>
        * [.computeHash(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.computeHash) ⇒ <code>String</code>

<a name="module_http-auth-utils/mechanisms/digest..DIGEST"></a>

### http-auth-utils/mechanisms/digest~DIGEST : <code>Object</code>
Digest authentication mechanism.

**Kind**: inner constant of [<code>http-auth-utils/mechanisms/digest</code>](#module_http-auth-utils/mechanisms/digest)  
**See**

- http://tools.ietf.org/html/rfc2617#section-3
- http://tools.ietf.org/html/rfc2069#section-2


* [~DIGEST](#module_http-auth-utils/mechanisms/digest..DIGEST) : <code>Object</code>
    * [.type](#module_http-auth-utils/mechanisms/digest..DIGEST.type) : <code>String</code>
    * [.parseWWWAuthenticateRest(rest)](#module_http-auth-utils/mechanisms/digest..DIGEST.parseWWWAuthenticateRest) ⇒ <code>Object</code>
    * [.buildWWWAuthenticateRest(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.buildWWWAuthenticateRest) ⇒ <code>String</code>
    * [.parseAuthorizationRest(rest)](#module_http-auth-utils/mechanisms/digest..DIGEST.parseAuthorizationRest) ⇒ <code>Object</code>
    * [.buildAuthorizationRest(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.buildAuthorizationRest) ⇒ <code>String</code>
    * [.computeHash(data)](#module_http-auth-utils/mechanisms/digest..DIGEST.computeHash) ⇒ <code>String</code>

<a name="module_http-auth-utils/mechanisms/digest..DIGEST.type"></a>

#### DIGEST.type : <code>String</code>
The Digest auth mechanism prefix.

**Kind**: static property of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
<a name="module_http-auth-utils/mechanisms/digest..DIGEST.parseWWWAuthenticateRest"></a>

#### DIGEST.parseWWWAuthenticateRest(rest) ⇒ <code>Object</code>
Parse the WWW Authenticate header rest.

**Kind**: static method of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix). |

**Example**  
```js
assert.deepEqual(
  DIGEST.parseWWWAuthenticateRest(
    'realm="testrealm@host.com", ' +
    'qop="auth, auth-int", ' +
    'nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", ' +
    'opaque="5ccc069c403ebaf9f0171e9517f40e41"'
  ), {
    realm: 'testrealm@host.com',
    qop: 'auth, auth-int',
    nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
    opaque: '5ccc069c403ebaf9f0171e9517f40e41'
  }
);
```
<a name="module_http-auth-utils/mechanisms/digest..DIGEST.buildWWWAuthenticateRest"></a>

#### DIGEST.buildWWWAuthenticateRest(data) ⇒ <code>String</code>
Build the WWW Authenticate header rest.

**Kind**: static method of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
**Returns**: <code>String</code> - The built rest.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  DIGEST.buildWWWAuthenticateRest({
    realm: 'testrealm@host.com',
    qop: 'auth, auth-int',
    nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
    opaque: '5ccc069c403ebaf9f0171e9517f40e41'
  }),
  'realm="testrealm@host.com", ' +
  'qop="auth, auth-int", ' +
  'nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", ' +
  'opaque="5ccc069c403ebaf9f0171e9517f40e41"'
);
```
<a name="module_http-auth-utils/mechanisms/digest..DIGEST.parseAuthorizationRest"></a>

#### DIGEST.parseAuthorizationRest(rest) ⇒ <code>Object</code>
Parse the Authorization header rest.

**Kind**: static method of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
**Returns**: <code>Object</code> - Object representing the result of the parse operation {hash}.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| rest | <code>String</code> | The header rest (string after the authentication mechanism prefix).) |

**Example**  
```js
assert.deepEqual(
  DIGEST.parseAuthorizationRest(
    'username="Mufasa",' +
    'realm="testrealm@host.com",' +
    'nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",' +
    'uri="/dir/index.html",' +
    'qop="auth",' +
    'nc="00000001",' +
    'cnonce="0a4f113b",' +
    'response="6629fae49393a05397450978507c4ef1",' +
    'opaque="5ccc069c403ebaf9f0171e9517f40e41"'
  ), {
    username: "Mufasa",
    realm: 'testrealm@host.com',
    nonce: "dcd98b7102dd2f0e8b11d0f600bfb0c093",
    uri: "/dir/index.html",
    qop: 'auth',
    nc: '00000001',
    cnonce: "0a4f113b",
    response: "6629fae49393a05397450978507c4ef1",
    opaque: "5ccc069c403ebaf9f0171e9517f40e41"
  }
);
```
<a name="module_http-auth-utils/mechanisms/digest..DIGEST.buildAuthorizationRest"></a>

#### DIGEST.buildAuthorizationRest(data) ⇒ <code>String</code>
Build the Authorization header rest.

**Kind**: static method of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
**Returns**: <code>String</code> - The rest built.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The content from wich to build the rest. |

**Example**  
```js
assert.equal(
  DIGEST.buildAuthorizationRest({
    username: "Mufasa",
    realm: 'testrealm@host.com',
    nonce: "dcd98b7102dd2f0e8b11d0f600bfb0c093",
    uri: "/dir/index.html",
    qop: 'auth',
    nc: '00000001',
    cnonce: "0a4f113b",
    response: "6629fae49393a05397450978507c4ef1",
    opaque: "5ccc069c403ebaf9f0171e9517f40e41"
  }),
  'username="Mufasa", ' +
  'realm="testrealm@host.com", ' +
  'nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", ' +
  'uri="/dir/index.html", ' +
  'response="6629fae49393a05397450978507c4ef1", ' +
  'cnonce="0a4f113b", ' +
  'opaque="5ccc069c403ebaf9f0171e9517f40e41", ' +
  'qop="auth", ' +
  'nc="00000001"'
);
```
<a name="module_http-auth-utils/mechanisms/digest..DIGEST.computeHash"></a>

#### DIGEST.computeHash(data) ⇒ <code>String</code>
Compute the Digest authentication hash from the given credentials.

**Kind**: static method of [<code>DIGEST</code>](#module_http-auth-utils/mechanisms/digest..DIGEST)  
**Returns**: <code>String</code> - The hash representing the credentials.  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The credentials to encode and other encoding details. |

**Example**  
```js
assert.equal(
  DIGEST.computeHash({
    username: 'Mufasa',
    realm: 'testrealm@host.com',
    password: 'Circle Of Life',
    method: 'GET',
    uri: '/dir/index.html',
    nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
    nc: '00000001',
    cnonce: '0a4f113b',
    qop: 'auth',
    algorithm: 'md5'
  }),
  '6629fae49393a05397450978507c4ef1'
);
```

# Authors
- [Nicolas Froidure](https://insertafter.com/en/index.html)
- [Jake Pruitt](https://github.com/jakepruitt)

# License
[MIT](https://github.com/nfroidure/http-auth-utils/blob/master/LICENSE)
