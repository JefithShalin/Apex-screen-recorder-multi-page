# Oracle APEX Screen Recorder  Multi Page

A lightweight solution to enable screen recording across multiple pages in an Oracle APEX application using native browser capabilities.

This project extends screen recording beyond a single page, allowing users to capture complete workflows as they navigate through different pages within the application.

## Overview

In many Oracle APEX applications, user interactions span across multiple pages. Capturing this full journey is often difficult without relying on external tools.

This solution provides a browser-based approach to record user activity seamlessly across pages, ensuring continuity throughout the session.

## Key Features

* Screen recording across multiple APEX pages
* Continuous recording during page navigation
* Preview before downloading recordings
* Download recordings as video files
* No external plugins or dependencies
* Fully client-side implementation

## Use Cases

* End-to-end workflow recording
* Bug reporting and issue tracking
* User training and demonstrations
* Capturing multi-step business processes

## How It Works

* A recording session is initiated within the application
* Recording state is maintained across page navigation
* Browser-native capabilities handle screen capture
* The recorded session is made available for preview and download

## Why This Approach

Oracle APEX does not provide built-in screen recording functionality. External tools can introduce additional complexity and dependency.

This approach keeps everything within the application, making it easier to use, manage, and integrate into existing workflows.

## Project Structure (High-Level)

* Recorder Interface
* Recording Handler
* Multi-page State Management
* Preview and Download Module

## Requirements

* Oracle APEX application
* Modern browser with screen capture support
* Basic understanding of APEX navigation

## Highlights

* Works across multiple pages seamlessly
* Minimal setup required
* Suitable for real-world application scenarios
* Reusable and scalable approach

## Reference

Blog explanation:
[https://jefithshalin.blogspot.com/2026/05/screen-recorder-in-oracle-apex-multi.html](https://jefithshalin.blogspot.com/2026/05/screen-recorder-in-oracle-apex-multi.html)
