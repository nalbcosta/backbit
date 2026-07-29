# backbit
[![Status](https://img.shields.io/badge/status-in%20progress-0f766e?style=for-the-badge)](https://github.com/nalbcosta/backbit)
[![Platform](https://img.shields.io/badge/platform-mobile--first-111827?style=for-the-badge)](https://github.com/nalbcosta/backbit)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20NestJS%20%7C%20MongoDB-2563eb?style=for-the-badge)](https://github.com/nalbcosta/backbit)
[![RAWG](https://img.shields.io/badge/catalog-RAWG-6d28d9?style=for-the-badge)](https://rawg.io/apidocs)

Backbit is a mobile-first app for people who keep adding games to their backlog and never know what to play next.

It helps you track what you want to play, what you are playing now, and what you already finished — with a board that feels practical, fast, and built for real use instead of just collecting entries.

## What it is

Backbit sits somewhere between a game journal, a backlog manager, and a discovery app. The idea is simple: keep your library organized, rate what you played, log your sessions, and get better signals for choosing the next game instead of scrolling through an endless list.

This project takes inspiration from the emotional, profile-driven feel of products like Letterboxd, but applies it to games with a kanban structure and a stronger focus on play flow.

## Core experience

- Keep games in clear states: backlog, playing, finished, paused, and dropped.
- Move games through a simple board instead of burying them in static lists.
- Rate games, leave short reviews, and keep lightweight notes about your playthrough.
- Log sessions and build a small history around what you played and when.
- Discover games with filters, then decide based on your own backlog context instead of raw popularity alone.

## Why it exists

A lot of game trackers are good at storing data, but weaker at helping you make decisions once your backlog gets messy. Backbit is meant to close that gap by treating the backlog as something active, not archival.

The product direction is less about “another place to list games” and more about making the backlog usable again.

## Product direction

Backbit is being built around three ideas:

- **Track** what matters without turning the app into a spreadsheet.
- **Decide** what to play next with more context.
- **Remember** the games you played through notes, ratings, and sessions.

## Stack

- Next.js + TypeScript for the web app.
- NestJS + TypeScript for the backend.[1]
- MongoDB for the product layer and user data.[1]
- RAWG for external game metadata, accessed through the backend only.

RAWG requires an API key for requests, so the key should stay on the server side instead of being exposed in the client. Their API usage also requires attribution in the applicable plan, which should be respected anywhere game data and media are surfaced in the product.

## First scope

The first version is focused on the smallest useful product shape:

- Search games.
- Add them to the board.
- Move them across statuses.
- Rate and review them.
- Log play sessions.
- Surface simple “what to play next” suggestions.

## Status

Early build. Product direction, architecture, and initial repository structure are being defined now.
