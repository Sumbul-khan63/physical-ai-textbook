---
title: Communication Patterns in ROS 2
sidebar_position: 4
description: Understanding how ROS 2 enables communication between different robotic system components
---

# Communication Patterns in ROS 2

Communication is the foundation of any nervous system, enabling coordinated behavior across distributed components. In ROS 2, multiple communication patterns allow different types of information exchange between nodes, each suited to particular types of robotic tasks. Understanding these patterns is crucial for grasping how robotic systems coordinate complex behaviors. This section explains the various communication mechanisms in ROS 2 without focusing on technical implementation details.

Mathematically, we can conceptualize the communication process in a robotic system as information flowing through different channels with distinct properties:

- For topic-based communication: `Data(t) = Σ Publisher_i(t)`, where data at time t is the sum of all publisher contributions
- For service communication: `Response = Service(Query)`, where a specific query receives a direct response
- For action communication: `Result = ∫ Action(Goal, t) dt` with feedback function `Feedback(t)`, representing a process that unfolds over time with ongoing updates

import LearningObjectives from '@site/src/components/LearningObjectives';
import KeyTakeaways from '@site/src/components/KeyTakeaways';
import PracticeQuestions from '@site/src/components/PracticeQuestions';

<LearningObjectives
  items={[
    {
      title: "Identify Communication Patterns",
      description: "Recognize the different communication patterns in ROS 2 and their appropriate uses"
    },
    {
      title: "Understand Publish-Subscribe",
      description: "Explain how topic-based communication works in ROS 2"
    },
    {
      title: "Describe Service Communication",
      description: "Understand request-response communication patterns"
    },
    {
      title: "Appreciate Action Communication",
      description: "Recognize when to use action-based communication for long-running tasks"
    }
  ]}
/>

## Introduction to ROS 2 Communication

In a robotic system, different components need to share information in various ways depending on the nature of the task. Some communications require immediate responses, others involve continuous data streams, and some involve complex, long-running operations that need periodic updates. ROS 2 provides three primary communication patterns to address these different needs:

1. **Topics (Publish-Subscribe)**: For continuous data streams like sensor readings
2. **Services (Request-Response)**: For query-and-answer interactions
3. **Actions (Goal-Feedback-Result)**: For long-running operations that need monitoring

Think of these patterns like different forms of human communication:

- Topics are like a news broadcast where information flows continuously and anyone can listen
- Services are like asking a question and getting an immediate answer
- Actions are like delegating a task and receiving periodic updates on progress

## Topic-Based Communication (Publish-Subscribe)

The most common communication pattern in ROS 2 is topic-based communication, which uses a publish-subscribe model. This pattern is ideal for continuous data streams like sensor readings, system status updates, or robot pose information.

### How Topics Work

In topic-based communication:
- **Publishers** send messages to named topics
- **Subscribers** receive messages from topics they're interested in
- Communication is asynchronous - publishers and subscribers don't need to be synchronized
- Multiple publishers can send to the same topic, and multiple subscribers can receive from the same topic

This is similar to how radio stations broadcast to multiple listeners simultaneously. Multiple sensors might publish to the same topic, or multiple control systems might subscribe to sensor data.

### Use Cases for Topic Communication

Topic-based communication is ideal for:
- **Sensor Data**: Camera images, lidar scans, IMU readings
- **Robot State**: Position, velocity, battery level
- **Control Commands**: Velocity commands to move a robot
- **System Status**: Health monitoring and diagnostics

<mermaid>
graph LR
    A[Sensor Node] -->|"Lidar Scan Data"| T["Topic: /laser_scan"]
    B[Camera Node] -->|"Image Data"| T
    T --> C[Perception Node]
    T --> D[Localization Node]
    T --> E[Navigation Node]
</mermaid>

### Characteristics of Topic Communication

- **Decoupled**: Publishers and subscribers don't need to know about each other
- **Asynchronous**: No direct timing coordination required
- **Broadcast**: One publisher can serve multiple subscribers
- **Continuous**: Data flows continuously as long as publisher is active
- **Lossy**: If a subscriber is not ready, messages might be lost

## Service-Based Communication (Request-Response)

Service-based communication provides a synchronous request-response pattern where one node sends a request and waits for a response from a service provider. This is similar to making a function call in traditional programming.

### How Services Work

In service-based communication:
- A **service client** sends a request to a specific service
- A **service server** receives the request, processes it, and sends back a response
- The client waits for the response before proceeding
- Communication is synchronous and point-to-point

This is like asking a colleague a specific question and waiting for their answer before continuing your work.

### Use Cases for Service Communication

Service-based communication is ideal for:
- **One-time Queries**: Asking for a specific piece of information
- **Configuration Changes**: Updating system parameters
- **Simple Actions**: Performing a task with a clear beginning and end
- **Synchronous Processing**: Operations that must complete before continuing

### Characteristics of Service Communication

- **Synchronous**: Client waits for response before continuing
- **Point-to-point**: One client communicates with one server
- **Reliable**: Request guaranteed to reach the server if it's available
- **Blocking**: Client is blocked until response is received or timeout occurs
- **Single Transaction**: Each request gets one response

## Action-Based Communication (Goal-Feedback-Result)

Action-based communication is designed for long-running tasks that require ongoing interaction between a client and server. It combines elements of both topic and service communication to handle complex operations with progress tracking.

### How Actions Work

In action-based communication:
- A **action client** sends a goal to an action server
- The server starts working on the goal and provides ongoing feedback about progress
- The client can monitor progress and cancel the goal if needed
- Eventually, the server returns a result (success or failure)

This is like assigning a complex task to a colleague and having periodic check-ins to monitor progress, with the option to cancel if circumstances change.

### Use Cases for Action Communication

Action-based communication is ideal for:
- **Navigation**: Moving to a distant location with progress updates
- **Manipulation**: Complex grasping or assembly tasks
- **Long Processing**: Image processing or planning that takes time
- **Calibration**: Procedures that take time with intermediate feedback

<mermaid>
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: Send Goal (Nav to x,y)
    loop Provide Feedback
        Server->>Client: Feedback (Progress: 30%)
        Server->>Client: Feedback (Progress: 60%)
        Server->>Client: Feedback (Progress: 90%)
    end
    Server->>Client: Result (Success)
</mermaid>

### Characteristics of Action Communication

- **Asynchronous**: Client doesn't block while goal is executing
- **Long-running**: Designed for operations that take time
- **Monitored**: Progress feedback available during execution
- **Controllable**: Client can cancel or preempt the goal
- **Reliable**: Goal and result delivery guaranteed

## Choosing the Right Communication Pattern

Selecting the appropriate communication pattern depends on the specific requirements of the robotic task:

### Topic vs. Service vs. Action Decision Matrix

| Requirement | Topic | Service | Action |
|-------------|-------|---------|--------|
| Continuous data stream | ✓ | ✗ | ✗ |
| Request-response pattern | ✗ | ✓ | (feedback) |
| Long-running with progress | ✗ | ✗ | ✓ |
| Multiple subscribers | ✓ | ✗ | ✗ |
| Synchronous response | ✗ | ✓ | ✗ |
| Cancellation capability | ✗ | ✗ | ✓ |
| Real-time performance | ✓ | (blocking) | (feedback) |

### Practical Examples

Let's consider how different communication patterns would apply to common robotic tasks:

**Robot Navigation:**
- Topics for continuous localization (robot position)
- Actions for navigation goals (go to a specific location)
- Services for configuration changes (update navigation parameters)

**Sensor Reading:**
- Topics for continuous sensor data (camera images, lidar scans)
- Services for sensor configuration (change camera exposure)
- Topics for sensor status (health, calibration status)

**Human-Robot Interaction:**
- Topics for speech recognition input
- Services for text-to-speech requests
- Actions for complex interaction tasks (follow me, bring object)

## Advanced Communication Concepts

### Quality of Service (QoS)

ROS 2 provides Quality of Service settings that allow fine-tuning of communication behavior:

- **Reliability**: Whether messages are guaranteed to be delivered
- **Durability**: Whether late-joining subscribers get past messages
- **History**: How many messages to store for late joiners
- **Deadline**: Maximum time to wait for message delivery

These settings allow adjusting communication behavior based on the criticality of the information.

### Message Types and Definition

Communication in ROS 2 happens through standardized message types that define the structure of the data being exchanged. These message definitions ensure that publishers and subscribers agree on the format of the information being shared, similar to how a common language enables effective human communication.

## Security and Communication

Modern robotic systems require secure communication, especially as robots become more connected:

- **Authentication**: Ensuring nodes are who they claim to be
- **Encryption**: Protecting message content from unauthorized access
- **Authorization**: Controlling which nodes can publish/subscribe to topics

ROS 2 includes security features to protect communication across these different patterns.

## Key Takeaways

<KeyTakeaways
  items={[
    "ROS 2 provides three main communication patterns: topics (publish-subscribe), services (request-response), and actions (goal-feedback-result)",
    "Topics are ideal for continuous data streams like sensor readings",
    "Services work best for synchronous request-response interactions",
    "Actions are designed for long-running tasks with progress feedback and cancellation capabilities",
    "Choosing the right communication pattern depends on the specific requirements of the robotic task"
  ]}
/>

## Practice Questions

<PracticeQuestions
  questions={[
    {
      question: "Which communication pattern should be used for continuously streaming camera images?",
      options: [
        "Service communication",
        "Topic communication",
        "Action communication",
        "Direct function calls"
      ],
      correctAnswer: 1,
      explanation: "Topic communication is ideal for continuous data streams like camera images where multiple subscribers might need the same data."
    },
    {
      question: "What is the main difference between services and actions in ROS 2?",
      options: [
        "Services are faster than actions",
        "Actions support long-running operations with feedback and cancellation",
        "Services can have multiple servers",
        "Actions use different message types"
      ],
      correctAnswer: 1,
      explanation: "Actions are designed for long-running operations that provide ongoing feedback and can be cancelled, while services provide simple request-response communication."
    },
    {
      question: "When would you use action-based communication in a robot?",
      options: [
        "Publishing sensor data continuously",
        "Requesting a specific calculation with immediate response",
        "Asking the robot to navigate to a location with progress updates",
        "Sending a simple control command"
      ],
      correctAnswer: 2,
      explanation: "Navigation to a location is a long-running task where you want to monitor progress and potentially cancel the operation, making it ideal for action-based communication."
    }
  ]}
/>

---