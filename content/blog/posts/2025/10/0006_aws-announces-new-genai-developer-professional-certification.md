---
title: AWS announces its new GenAI Developer Professional certification
description: The AWS AI Certification path is now complete with the newly announced Generative AI Developer — Professional certification. Will YOU be pursuing it?
date: 2025-10-16
tags: ["AI", "GenAI", "MLOps", "AWS Certifications", "AIP-C01", "Tech Career"]
draft: false
thumbnail_video: "https://www.youtube.com/watch?v=ORlPPSim37Q"
---
https://www.youtube.com/watch?v=ORlPPSim37Q

AWS just announced a new certification: [AWS Certified Generative AI Developer — Professional](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/). This certification replaces the older [AWS Certified Machine Learning — Specialty](https://aws.amazon.com/certification/certified-machine-learning-specialty/), and completes the AWS AI certification path. [Here](https://aws.amazon.com/blogs/training-and-certification/big-news-aws-expands-ai-certification-portfolio-and-updates-security-certification/) is the link to the official announcement. Most of the information is expected to arrive on the 18th of November, but do check out the links for the few facts we already have. In this blog post I will recap the community's first impressions and also give my personal ones as someone who has worked developing GenAI apps in the past year. The content of this blog post is also in the YouTube video above, if you prefer watching to reading.

## Note on AWS Cert abbreviations
To avoid being overly verbose, I will use the following abbreviations for the AWS certifications mentioned in this blog post:

- AWS Certified AI Practitioner → **AIF**
- AWS Certified Data Engineer — Associate → **DEA**
- AWS Certified Machine Learning Engineer — Associate → **MLE Associate**
- AWS Certified Machine Learning — Specialty → **ML Specialty**
- AWS Certified Generative AI Developer — Professional → **GenAI Dev Pro**

## AWS AI Certification path completed
This announcement did not catch us by surprise in the AWS Certifications community. Ever since MLE Associate became available, we suspected that ML Specialty would soon be deprecated. After all, both of those certifications have about an 80% overlap in their content, just the focus on them was different (MLE Associate focuses on everything pertaining to Amazon SageMaker and MLOps in AWS, whereas ML Specialty also tested your knowledge in vendor-agnostic ML and AI concepts). ML Specialty also felt outdated since it did not cover any modern GenAI material.

<img src="{{ '0006_aws_ai_cert_path.png' | blogImagePath }}" alt="The complete AWS AI Certification path tree" eleventy:ignore>

AWS has been deprecating Specialty certifications in the past years and moving towards Associate and Professional certifications instead. Hence we all speculated that they would soon announce a new Pro cert that would renew DEA and MLE Associate certifications when you passed it. This would follow the pattern we see in the AWS DevOps Pro certification, which renews AWS Developer Associate and AWS CloudOps Associate certifications if you pass it. It makes sense.

<img src="{{ '0006_aws_devops_path.png' | blogImagePath }}" alt="The AWS Devops Certification path tree" eleventy:ignore>

## Naming
The naming of the new cert raises some eyebrows. We were expecting it to maybe be "MLOps Professional", but instead they chose "GenAI Developer Professional". This is probably due to marketing reasons, since "GenAI developer" probably catches the attention of sales and recruitment people more than the term "MLOps engineer".

If we get technical, a GenAI dev does not need to know much of the underlying ML/AI technologies that trained the GenAI Foundation Models, they just need to know how to make them work in their app. Colloquially, most GenAI apps out there are known as "ChatGPT wrappers" because, well, that's exactly what they are! Everyone and their mother wants a RAG chatbot for their business right now, so GenAI devs who can do this are in high demand. An MLOps engineer **does** need to at least have some notions of ML training and ML inference deployment.

As an analogy, a car driver only needs to know how to drive a car and that's it, but a car mechanic **does** need to know some of the inner workings of a car in order to repair or maintain it. The car driver would be the GenAI developer and the car mechanic would be the MLOps engineer.

<img src="{{ '0006_cardriver_vs_carmechanic.png' | blogImagePath }}" alt="A picture with a car driver to the left and a car mechanic to the right" eleventy:ignore>

If the GenAI Dev Pro cert builds on top of MLE Associate and DEA, then we can expect the cert to test you on MLOps engineering too, not just on GenAI development. So the naming is not super accurate.

## My own impressions
As an AI software engineer who has been developing GenAI apps for the past year, and who already completed AIF and MLE Associate, I am probably a good candidate for this new Professional certification. The idea of taking the exam and getting certified excites me, but a Pro cert is very demanding, and I haven't taken one yet. Right now I think I will definitely check the AWS SkillBuilder exam prep materials once they become available on the 18th of November, but I still have to decide whether I will go for the cert, and if I do, whether I do so while in Beta. Here are some concerns I have:

### Should you take the exam in Beta?
One incentive to take the exam early is to get the **Early Adopter badge**. I personally have both Early Adopter badges for AIF and MLE Associate, although honestly I haven't seen these badges be of any worth or use. They look good and shiny on a CV I guess. In the case of AIF I took the exam while it was still in Beta, whereas MLE Associate I took after it came out of Beta. We still don't know if AWS will continue to give an Early Adopter badge for GenAI Dev Pro when it comes out of Beta or not, they did so for AIF and MLE Associate for a few months, but there's no guarantee they'll do the same this time.

<img src="{{ '0006_early_adopter_badges.png' | blogImagePath }}" alt="Certification badges of AWS AIF-C01, AWS MLA-C01, and their corresponding Early Adopter badges" eleventy:ignore>

Another incentive to try out the exam in Beta is that it's **50% cheaper** than usual. That's no joke because the AWS Pro certs normally cost $300, they are pricy.

However Beta exams also have their drawbacks. First of all, **you can NOT retake Beta exams**. So if you fail a Beta exam, you need to wait until it goes General Access to retake it. Secondly, they are **longer and less refined** than the General Access exams. Pro cert exam questions are already really long and convoluted, so seeing more of them (and some with questionable wording) will for sure drive many of us crazy. Specifically, the exam consists of 85 questions and is 210 minutes long (240 minutes if, like me, you're not an English native speaker). That's almost 4 hours sitting in an exam! Yikes! 😨

### What's the real worth of this new AWS GenAI Dev Pro cert?
It's no secret that AWS have lagged behind its main competitors, Azure and GCP, when it comes to AI. Heck, even though we hosted our app infrastructure in AWS in the two main AI projects that I worked on in the past year, we still called OpenAI endpoints when it was time to use an LLM. For one of the projects, we called an external GCP service to do Optical Character Recognition (OCR) instead of using the AWS-native Amazon Textract service. So far I haven't used Amazon Bedrock or Amazon SageMaker in my production projects (just for cert preparation), and companies seem to be relying on non-AWS services more when it comes to AI. It's uncertain whether knowing about AWS AI services will bring much value to candidates in the AI market.

<img src="{{ '0006_cube_llm_infra.png' | blogImagePath }}" alt="A snapshot of the infrastructure architecture of the Cube LLM project, where the AI services were NOT AWS-native" eleventy:ignore>

AWS are desperately trying to break through in the AI services market and this new cert probably is part of that strategy. They have created and curated a complete AI career path with their new certifications, whereas they have left their existing certifications mostly untouched instead of requiring AI knowledge in them. Most people agree that the AWS Solutions Architect certifications (Associate and Professional) are the most valuable AWS certifications since they test your knowledge of the vast AWS ecosystem, but for those you barely need to know a few things of their AI services. We will have to see if these new AI certifications gain any traction and value in a tough and competitive market, right now it's too early to say.

There is also something to be said about IT certifications being devalued more and more lately. The market is rough and when people don't have jobs they try to upskill by getting certs to stand out from the crowd. But when everyone has certifications, they become more of a prerequisite rather than an asset. That said, Pro certs are tough to get, so they **DO** stand out more than the Associate certs.

## Summary
AWS completes its AI certification path with this new GenAI Dev Pro certification, while deprecating ML Specialty. While my interest is peaked and right now I believe I want to pursue the certification, I'm still not sure if I will take it during its Beta period, and I also have doubts as to the actual value of the cert in the market. Maybe I should first take DEA, which I haven't taken yet, in order to prepare for it.

Will YOU be taking this GenAI Dev Pro certification? Or preparing for it by taking AIF, DEA, and/or MLE Associate first? Remember that I have [study notes](https://www.christiangreciano.com/notes.html) and [flashcards](https://www.christiangreciano.com/flashcards.html) for AIF and MLE Associate certifications (some of them free of access), so if you will take the preceding certifications first, do check my study materials out! Good luck in whatever endeavors you decide to embark on!
