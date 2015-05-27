import assert from 'assert';
import neatequal from 'neatequal';
import DIGEST from './digest';

describe('digest', function() {

  describe('type', function() {

    it('should be the digest auth prefix', function() {
      assert.equal(DIGEST.type, 'Digest');
    });

  });

  describe('parseWWWAuthenticateRest', function() {

    it('should work', function() {
      neatequal(
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
    });

  });

  describe('buildWWWAuthenticateRest', function() {

    it('should work', function() {
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
    });

    it('should be the inverse of parseWWWAuthenticateRest', function() {
      neatequal(
        DIGEST.parseWWWAuthenticateRest(
          DIGEST.buildWWWAuthenticateRest({
            realm: 'perlinpinpin'
          })
        ), {
        realm: 'perlinpinpin'
      });
    });

  });

  describe('parseAuthorizationRest', function() {

    it('should work', function() {
      neatequal(
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
    });

  });

  describe('buildAuthorizationRest', function() {

    it('should work', function() {
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
    });

    it('should be the inverse of parseAuthorizationRest', function() {
      neatequal(
        DIGEST.parseAuthorizationRest(
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
          })
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
      });
    });

  });

  describe('computeHash', function() {

      it('should work', function() {
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
      });

  });

});