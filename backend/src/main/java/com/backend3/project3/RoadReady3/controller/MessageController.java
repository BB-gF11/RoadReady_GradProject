package com.backend3.project3.RoadReady3.controller;

import com.backend3.project3.RoadReady3.model.Message;
import com.backend3.project3.RoadReady3.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<String> createMessage(@RequestBody Message message) {
        try {
            String id = messageService.createMessage(message);
            return ResponseEntity.ok("Message sent with ID: " + id);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send message");
        }
    }

    @GetMapping("/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(@PathVariable String userId1,
                                                                 @PathVariable String userId2) {
        try {
            List<Message> messages = messageService.getMessagesBetweenUsers(userId1, userId2);
            if (messages.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(messages);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{messageId}/content")
    public ResponseEntity<String> updateMessageContent(@PathVariable String messageId, @RequestBody String newContent) {
        try {
            messageService.updateMessageContent(messageId, newContent);
            return ResponseEntity.ok("Message content updated");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update message content");
        }
    }

    @PutMapping("/{messageId}/read")
    public ResponseEntity<String> markMessageAsRead(@PathVariable String messageId, @RequestBody boolean readStatus) {
        try {
            messageService.markMessageAsRead(messageId, readStatus);
            return ResponseEntity.ok("Message read status updated");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update message read status");
        }
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<String> deleteMessage(@PathVariable String messageId) {
        try {
            String result = messageService.deleteMessage(messageId);
            return ResponseEntity.ok(result);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to delete message");
        }
    }
}
