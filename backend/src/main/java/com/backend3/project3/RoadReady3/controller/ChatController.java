package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.model.Chat;
import com.backend3.project3.RoadReady3.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping()
    public List<Chat> getChatsByUser(
            @RequestHeader("Authorization") String token,
            @RequestParam("userId") String userId) throws InterruptedException, ExecutionException {
        return chatService.getChatsByUser(userId);
    }

    @GetMapping("/{chatId}/messages")
    public List<Chat> getChatMessagesByChatId(
            @RequestHeader("Authorization") String token,
            @PathVariable("chatId") String chatId) throws InterruptedException, ExecutionException {
        return chatService.getChatMessagesByChatId(chatId);
    }

    @GetMapping("/{chatId}")
    public Chat getChatById(@RequestHeader("Authorization") String token, @PathVariable("chatId") String chatId) throws InterruptedException, ExecutionException {
        return chatService.getChatById(chatId);
    }

    @PostMapping("/{chatId}/createMessage")
    public ResponseEntity<?> createMessage(
            @RequestHeader("Authorization") String token,
            @PathVariable("chatId") String chatId,
            @RequestBody Chat chat) {
        try {
            Chat existingChat = chatService.getChatById(chatId);

            if (existingChat == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chat not found. Cannot create message.");
            }

            Chat savedChat = chatService.createMessage(chatId, chat);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedChat);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message.");
        }
    }


    @PostMapping("/create")
    public ResponseEntity<?> createNewChat(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> payload) {

        try {
            String chatId = (String) payload.get("chatId");
            String senderId = (String) payload.get("senderId");
            String receiverId = (String) payload.get("receiverId");

            if (chatId == null || chatId.isEmpty() ||
                    senderId == null || senderId.isEmpty() ||
                    receiverId == null || receiverId.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("chatId, senderId, or receiverId is missing.");
            }

            Chat newChat = chatService.createChat(chatId, senderId, receiverId);

            return ResponseEntity.status(HttpStatus.CREATED).body(newChat);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create chat.");
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> createNewChat(
//            @RequestHeader("Authorization") String token,
//            @RequestBody Map<String, Object> payload) {
//
//        try {
//            String chatId = (String) payload.get("chatId");
//            List<String> users = (List<String>) payload.get("users");
//
//            if (chatId == null || chatId.isEmpty() || users == null || users.size() < 2) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid chatId or users list.");
//            }
//
//            Chat newChat = chatService.createChat(chatId);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body(newChat);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create chat.");
//        }
//    }
}

//package com.backend3.project3.RoadReady3.controller;
//
//import com.backend3.project3.RoadReady3.model.Chat;
//import com.backend3.project3.RoadReady3.service.ChatService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.ExecutionException;
//
//@RestController
//@RequestMapping("/api/chats")
//public class ChatController {
//
//    @Autowired
//    private ChatService chatService;
//
//    @GetMapping
//    public List<Chat> getChatsByUser(
//            @RequestHeader("Authorization") String token,
//            @RequestParam("userId") String userId) throws InterruptedException, ExecutionException {
//        return chatService.getChatsByUser(userId);
//    }
//
//    @GetMapping("/{chatId}/messages")
//    public List<Chat> getChatMessagesByChatId(
//            @RequestHeader("Authorization") String token,
//            @PathVariable("chatId") String chatId) throws InterruptedException, ExecutionException {
//        return chatService.getChatMessagesByChatId(chatId);
//    }
//
//    @GetMapping("/{chatId}/messages/{messageId}")
//    public Chat getChatMessageById(
//            @RequestHeader("Authorization") String token,
//            @PathVariable("chatId") String chatId,
//            @PathVariable("messageId") String messageId) throws InterruptedException, ExecutionException {
//        return chatService.getChatMessageById(chatId, messageId);
//    }
//
//    @PostMapping("/{chatId}/createMessage")
//    public ResponseEntity<?> createMessage(
//            @RequestHeader("Authorization") String token,
//            @PathVariable("chatId") String chatId,
//            @RequestBody Chat chat) {
//        try {
//            Chat existingChat = chatService.getChatById(chatId);
//
//            if (existingChat == null) {
//                existingChat = chatService.createChat(chatId);
//            }
//
//            Chat savedChat = chatService.createMessage(chatId, chat);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedChat);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message.");
//        }
//    }
//
//    @PostMapping("/create")
//    public ResponseEntity<?> createNewChat(
//            @RequestHeader("Authorization") String token,
//            @RequestBody Map<String, Object> payload) {
//
//        try {
//            String chatId = (String) payload.get("chatId");
//            List<String> users = (List<String>) payload.get("users");
//
//            if (chatId == null || chatId.isEmpty() || users == null || users.size() < 2) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid chatId or users list.");
//            }
//
//            Chat newChat = chatService.createChat(chatId);
//
//            return ResponseEntity.status(HttpStatus.CREATED).body(newChat);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create chat.");
//        }
//    }
//
//
//
//}
