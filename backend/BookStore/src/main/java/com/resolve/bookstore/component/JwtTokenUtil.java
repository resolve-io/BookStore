package com.resolve.bookstore.component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    // Method to convert String secret to SecretKey
    private SecretKey getSecretKey() {
        byte[] secretBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(secretBytes);
    }

    // Generate a JWT token for the user
    public String generateJwtToken(String username) {
        // Token expiration time (1 hour)
        long JWT_EXPIRATION = 1000 * 60 * 60;

        return Jwts.builder()
                .header().add("typ", "JWT")  // Optional, defaults to JWT
                .add("alg", "HS256").and()  // Signing algorithm
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))  // 1 hour expiration
                .signWith(getSecretKey())  // Sign the token with the SecretKey
                .compact();
    }

    // Extract username from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract any claim from the token
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        SecretKey secretKey = getSecretKey(); // Ensure you use the secret key for parsing

        // Use the parserBuilder() method for jjwt 0.11.0 and later
        return Jwts.parser()  // Use parserBuilder() instead of parser()
                .verifyWith(secretKey)  // Set the signing key
                .build()  // Build the parser
                .parseSignedClaims(token)  // Parse the JWT and get the claims
                .getPayload();  // Get the body of the JWT
    }


    // Validate if the token has expired
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from the token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Validate the JWT token
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
