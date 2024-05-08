package com.mydiary.User.Controller;
import com.mydiary.User.Model.User;
import com.mydiary.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            User newUser = userService.signUp(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to sign up. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        try {
            boolean result = userService.signIn(user.getUsername(), user.getPassword());
            if (result) {
                return new ResponseEntity<>("Successfully signed in.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid username or password.", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to sign in. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/isloggedin")
    public ResponseEntity<?> isLoggedIn() {
        try {
            boolean loggedIn = userService.isUserLoggedIn();
            return new ResponseEntity<>(loggedIn, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to check login status.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        try {
            userService.logout();
            return new ResponseEntity<>("Logged out successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to logout. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
