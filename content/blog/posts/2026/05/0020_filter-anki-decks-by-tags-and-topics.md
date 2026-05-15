---
title: How to study and filter Anki decks by topics and tags
description: When studying an Anki deck of flashcards, you can change the order in which Anki shows you the cards. You can use tags and filters to achieve this. This is helpful if, for example, you're studying topics in a different order than the deck's author.
date: 2026-05-15
tags: ["Anki", "Flashcards", "Tutorial", "Filter", "Tags"]
thumbnail_image: "0020_tn_anki-filters.png"
---
https://www.youtube.com/watch?v=MOFXlwdiYzg

Many people who have downloaded or purchased my Anki decks have asked whether it's possible to adjust the order of their flashcards to their liking, or to study by topic, theme, or AWS service. The short answer is **YES**! You certainly can do all of this by using Anki tags and filters. In this blog post I will teach you how to do so via the Anki desktop app, using my [AWS AI Practitioner (AIF-C01) deck](https://ankiweb.net/shared/info/73981918) as an example.

## Filtering by Anki tags or fields in the Anki browser
In a [previous blog post](https://christiangreciano.com/blog/posts/2025/11/0008_import-apkg-files-into-Anki/) I explained how to import an .apkg file into your Anki app. Let's assume you've already imported this deck and that you can see it in your list of decks. Click on the deck, and then click "Browse". This will open the Anki browser, showing all the cards of your selected deck.

<img src="{{ '0020_anki-deck-menu-browse-button-screenshot.png' | blogImagePath }}" alt="Screenshot of the home page of an Anki deck, with the Browse button highlighted" eleventy:ignore>

<img src="{{ '0020_anki-browser-screenshot.png' | blogImagePath }}" alt="Screenshot of Anki's browser" eleventy:ignore>

Observe how each flashcard has at least one tag associated to it, as well as a field called `Reference`, with one or more links to the sources I used to create the flashcard. If you are creating your own Anki flashcards, I strongly suggest you add at least one tag and one reference to each of your cards, this brings a lot of benefits in the long run!

You can filter the list of cards shown in the browser by providing a tag or text in the text field at the top. Append `label:Amazon-Comprehend` after `"deck:AWS AI..."` and hit Enter. You will then only see the flashcards labeled with `Amazon-Comprehend`. You can achieve the same result by selecting the appropriate tag in the Sidebar filter on the left side of the browser:

<img src="{{ '0020_anki-browser-filtered-by-tag.png' | blogImagePath }}" alt="Filtering by tag in Anki's browser" eleventy:ignore>

You can also filter by **text**: append any text to the search bar and Anki will show you only the cards that contain that text in any of the card's fields. This is obviously very useful to find, for example, all cards that mention one concept or entity. But it can also be useful to, in our case, filter cards by source or lecture. Filtering by links, however, is a little tricky: adding a full link (e.g. [https://www.udemy.com/course/aws-ai-practitioner-certified/learn/lecture/44886687](https://www.udemy.com/course/aws-ai-practitioner-certified/learn/lecture/44886687) ) to the browser will fail to find the cards, because Anki's search function uses non-alphanumeric characters as modifiers, and those are present in URLs (e.g. `:`, `/`, etc). So, while it's useful to keep the full URL in `Reference` to quickly find the source of the flashcard, to filter all flashcards with the same URL you must select only a relevant sub-sequence of alphanumeric characters inside the URL. In our case, select the lecture's ID (the sequence of numbers) and voilà! You can see all flashcards that belong to the same lecture:

<img src="{{ '0020_anki-browser-filtered-by-text.png' | blogImagePath }}" alt="Filtering by text in Anki's browser" eleventy:ignore>

## Studying cards by tag, topic, or lecture
By default, when you start studying an existing deck, Anki will show you the flashcards in the order that the author originally inserted them in the deck. If you use one of my decks, the cards will be shown following the order of topics in my study notes. So in the case of [my AWS AI Practitioner (AIF-C01) notes](https://psychedelic-cuticle-e74.notion.site/AWS-AI-Practitioner-AIF-C01-10386c7395e780e89ea4c70bb061451b), here is the table of contents:

<img src="{{ '0020_aws-ai-practitioner-notes-screenshot.png' | blogImagePath }}" alt="Screenshot of the table of contents of my AWS AI Practitioner study notes" eleventy:ignore>

If you follow the default order, you will first study AI 101, then Cloud Computing Fundamentals, then AWS Accounts, then Bedrock, etc. But what if you decide to start by studying Amazon Q? In that case you'd rather skip the flashcards on Bedrock and Prompt Engineering and start answering cards about Amazon Q. In this case I recommend that you **suspend** ALL flashcards in the deck, then filter the cards you want to study, and **unsuspend** only those cards. Anki only shows you unsuspended cards when it's time to study, so you can progressively unsuspend the flashcards of the material as you cover it. Step-by-step:

1. Load your deck in the Anki browser
2. Select all cards in the deck: Top Menu -> "Edit" -> "Select All", or use the keyboard shortcut (Cmd + A on Mac or Ctrl + A on Windows/Linux)
3. Right-click on the cards -> "Cards" -> "**Toggle suspend**"
<img src="{{ '0020_toggle-suspend-on-anki-cards.png' | blogImagePath }}" alt="Toggling suspend on Anki cards" eleventy:ignore>

4. You have now suspended all cards in the deck. If you type `is:suspended` in the Anki browser search (or click on `Suspended` card state on the filters to the left), you should see all cards of the deck, since they have all been suspended. If you now tried to study the deck, Anki would tell you there is nothing to study, because there are no new unsuspended cards available!
5. Just as we learned in the previous section, filter the deck with `tag:Amazon-Q` (or selecting the tag in the filters of the left panel). You should now only see the cards tagged with Amazon-Q. Select them all -> Right-click on cards -> "Cards" -> "**Toggle suspend**"
6. You have now unsuspended all cards tagged with Amazon-Q in the deck. Since these are the only cards that are unsuspended, Anki will now only quiz you on the Amazon-Q cards. Neat!

You can follow a similar process to later unsuspend cards from a different tag, from a specific lecture, or from any other filter you can concoct.

## Anki Filtered Decks and cramming
So far we have learned how to study a deck in an order that suits us via tags and filters. This is with a long-term learn & review mindset, which Anki and Spaced Repetition algorithms (SRS) excel at. But what if you want to cram, let's say, all the SageMaker flashcards the night before the AWS AI Practitioner exam, as a final review? Well, I was about to skip this use case, because **last-minute cramming has tons of drawbacks** (increased stress, makes your pre-exam sleep worse, what you haven't learned by then you probably haven't learned anyway...). But if you insist on ignoring my advice (which is the advice of cognitive science BTW! 🤓), Anki does offer a feature to create **temporary filtered decks**. These are subdecks containing cards from a tag or specific filter, and those cards are returned to their parent/home deck once you review them in your filtered deck.

How to create a filtered deck?
1. Select your deck, then click "**Custom Study**" on the bottom.
2. Select "**Study by card state or tag**". You can choose the number of cards and whether you want some or all cards.

<img src="{{ '0020_create-anki-filtered-deck.png' | blogImagePath }}" alt="Creating a filtered deck in Anki" eleventy:ignore>

3. Click "Choose Tags".
4. Check the checkbox "Require one or more of these tags". Then select the tag(s) you want to study (e.g. `Amazon-SageMaker`)
5. Click on "OK". Anki will have now created a filtered deck with all SageMaker cards, and you'll see this as a "**Custom Study Session**" deck (click "Study Now" to start).

There are tons of things you can do with filtered decks but frankly I myself haven't used them much (because I avoid last-minute cramming, ahem! 😏). I suggest you consult the [Filtered Decks](https://docs.ankiweb.net/filtered-decks.html) section in the official Anki manual if you want to delve deeper. There are even add-ons like [AnkiCram](https://ankiweb.net/shared/info/123859453) if that's your sort of thing (but I don't endorse them myself).

## What if I use Anki on mobile?
Indeed, this tutorial has focused only on the desktop app of Anki. This is intentional: the desktop app offers much more functionality than the mobile apps, and you should use the desktop app whenever you're tweaking or configuring anything in Anki. I'm not 100% sure if everything I have shown here can be done on mobile, and it might even be so that it's not the same in iOS or Android. So I'm gonna keep this tutorial simple and just for desktop. I myself only use the Anki mobile app for reviewing my cards, and I suggest you do the same: desktop Anki to create, edit, and tweak cards and configurations; and mobile Anki to review cards.

## Conclusion
You now have the skills and knowledge to filter Anki cards by tags, topics, and lectures, which means you can study Anki cards in a different order than the default one. Although it can feel a bit overwhelming at first, Anki is a super powerful tool, and learning some basic tweaks can grant you a lot of flexibility and personalization. This tutorial should also have convinced you to always tag your Anki cards and also include a reference URL to your source(s).

Have Anki tags and filters been useful to you in a different way? I'd like to know! Reach out to me or comment on my YouTube video, I'd be curious to hear!
