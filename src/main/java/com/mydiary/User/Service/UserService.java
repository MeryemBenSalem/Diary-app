package com.mydiary.User.Service;

import com.mydiary.User.Model.User;
import com.mydiary.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User signUp(User user) {
        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean signIn(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            httpSession.setAttribute("user", user);
            return true;
        }
        return false;
    }

    public boolean isUserLoggedIn() {
        return httpSession.getAttribute("user") != null;
    }

    public void logout() {
        httpSession.invalidate();
    }
}
