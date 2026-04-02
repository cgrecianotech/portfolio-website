---
title: The AWS GenAI Dev Pro (AIP-C01) Certification Beta is now live
description: One can now register for the Beta exam of the new AWS Generative AI Developer — Professional certification (AWS AIP-C01). The official exam guide and exam prep material in AWS Skill Builder are also available. I'm excited to take this cert!
date: 2025-11-29
tags: ["AWS Certifications", "AI", "GenAI", "AIP-C01", "AWS Exam Prep"]
thumbnail_video: "https://www.youtube.com/watch?v=BkoDzagPDCw"
---
https://www.youtube.com/watch?v=BkoDzagPDCw

Last month I wrote a [blog post](https://www.christiangreciano.com/blog/posts/2025/10/0006_aws-announces-new-genai-developer-professional-certification/) with my initial impressions about the new AWS GenAI Developer Professional certification. We didn't have much information back then, but we do now, and the [registration for this certification's Beta exam is now open](https://aws.amazon.com/certification/certified-generative-ai-developer-professional/). The earliest day you can take the exam appears to be 16th December.

I have read the official exam guide, started the AWS Skill Builder course, and taken the sample practice exam questions by Tutorials Dojo. In this blog post I will share what I know and have experienced so far.

## Note on AWS Cert abbreviations
To avoid being overly verbose, I will use the following abbreviations for the AWS certifications mentioned in this blog post:

- AWS Certified AI Practitioner → **AIF**
- AWS Certified Machine Learning Engineer — Associate → **MLA**
- AWS Certified Generative AI Developer — Professional → **AIP**

## Certification Code: AIP-C01
First off, the certification code is now official: **AIP-C01**. Last time I mentioned how the cert's name was a bit misleading, and now its accompanying code is also slightly confusing. "AIP" could be easily confused with the foundational-level "AI Practitioner" certification (with code AIF-C01). And since "AIP" most likely stands for "AI Professional", why didn't they name the certification "AWS AI Engineer Professional" in the first place? The chain from Foundational to Professional would also make more sense if it were at least AIF→AIA→AIP, but it's now AIF→MLA→AIP... Yeah, no matter how you look at it, it's far from consistent! 😅

## Overview of Exam Guide
If you've taken AWS certification exams before, there's nothing surprising in the [AIP exam guide](https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/pdfs/docs-aip/AWS-Certified-Generative-AI-Developer-Pro_Exam-Guide.pdf). It will all sound very familiar. It's still mostly a multiple-choice questions exam with scaled scoring. Because the exam is currently in Beta and not General Access, it costs 50% less (i.e. $150), but it's also longer (85 questions in 205 minutes) and you can't retake it if you fail (you must wait until General Access to retake a failed Beta exam).

If you are going for the Early Adopter badge, this time it will be different compared to the AIF and MLA certifications: **only the first 5000 people who pass the exam will be granted this Early Adopter badge**. As I said in my previous post, the Early Adopter badge hasn't brought me more value than just bragging rights, but if you're going for it, be mindful that it's a race with our peers. Is 5000 people a few or a lot? I honestly have no idea... 🤷‍♂

Maybe the most important part to take away from the exam guide are the **5 domains** included in the exam, which you should cover well to increase your chances:
1. Foundation Model Integration, Data Management, and Compliance (31% of scored content)
2. Implementation and Integration (26% of scored content)
3. AI Safety, Security, and Governance (20% of scored content)
4. Operational Efficiency and Optimization for GenAI Applications (12% of scored content)
5. Testing, Validation, and Troubleshooting (11% of scored content)

## AWS Skill Builder Prep Course
Third-party courses obviously don't exist yet, but what we do have is the official [exam prep course in AWS Skill Builder](https://skillbuilder.aws/learning-plan/9VXVGYT38G/exam-prep-plan-aws-certified-generative-ai-developer--professional-aipc01--english/4SCMN2659K). We can expect content creators and third-party instructors to put out their materials in the upcoming weeks, especially after the first exam takers report on how the exam went, but in the meantime Skill Builder is the only trustworthy resource. I had never used Skill Builder before, but since I wanted to get a head start, I went ahead and paid a $29 one-month subscription and looked at the contents of the course. So far I have completed all the materials in Domain 1, and I look forward to completing Domains 2-5 in the next few weeks.

As someone who has prepared for previous AWS certs with third-party instructors and courses, I must say that the AWS Skill Builder UI is kinda garbage (similar to the AWS Management Console UI 🙄). There's a ton of buttons to click to proceed, and you must enroll in the different domains (you can't enroll in the whole course for some reason). In this screenshot for example you first must enroll in the course, then click "Start", or else you're just seeing a non-clickable table of contents.

<img src="{{ '0010_aws-skill-builder-aip-screenshot.png' | blogImagePath }}" alt="A screenshot of the AWS Skill Builder prep course for AIP-C01" eleventy:ignore>

Then there's paying for a subscription to AWS Skill Builder, which gets billed to an AWS account. AWS accounts are for infrastructure and cloud resources, not for online courses, I don't know why that should get billed there... Anyway, just saying that while edtech platforms like Udemy are not perfect, their UI is much more intuitive than AWS Skill Builder.

As to the content of the course itself, I do find it quite interesting! Each section has an example of a business scenario that requires a complex AI system, and every choice of AWS service, product, or feature used to build the AI system is outlined. They mix in checkpoint questions and videos to not have you just read endless text, which is appreciated. The videos are sadly AI-generated. At least the AI videos are of high quality, but I think it's sad that a company like Amazon decides not to have a human instructor teach us, I'm pretty sure they can afford the salary of a well-qualified instructor! A great thing about Skill Builder is that it has some nice hands-on sections. While they do provide you with sample Python code and CLI scripts to set up the project, the labs don't hold your hands completely, and the student still needs to take ownership of what they build and deploy. You can even post on LinkedIn with the hashtag #awsexamprep to have AWS personnel review your work and endorse your for the skills you've shown. If you have a paid subscription, you also get access to practice exams, flashcards (of mid quality, they look AI-generated to me), and AWS SimuLearn. SimuLearn are hands-on lab on steroids (powered by AI). I haven't tried it yet myself, but I think I will want to give it a go, at least for one of the 5 domains (maybe if I feel I need reinforcement in a particular topic or area).

A word of warning: in order to make the most out of Skill Builder's AIP course, I **strongly** suggest you take the preceding [MLA-C01 certification](https://psychedelic-cuticle-e74.notion.site/AWS-Machine-Learning-Engineer-Associate-MLA-C01-19686c7395e780e1bab0eac37d0401a0)! The AIP course assumes you have a strong knowledge of AI, AWS, and AWS AI services. It tells you how different AWS services, products, and features integrate together to build complex AI systems, but they don't explain any service in isolation. Most of the course will fly over your head if you don't know about those services, products, or features in the first place! Imagine reading about heart surgeries and lacking knowledge about veins, arteries, blood pressure, surgery tools, etc!

<img src="{{ '0010_heart-surgeon-meme.png' | blogImagePath }}" alt="A meme from Reddit where a heart surgeon performs an operation following a YouTube video" eleventy:ignore>

<center>

Image from [Reddit](https://www.reddit.com/r/comics/comments/gast79/oc_relax_im_a_doctor/)

 </center>

## 3rd-Party Content Creators have announced Courses
Good news! Some popular third-party content creators have announced that they are already preparing courses to help others pass the AIP exams. So if you prefer that way instead of AWS Skill Builder, you can wait a couple of weeks and there should be more resources out. Here are some examples:
- [Andrew Brown](https://www.reddit.com/r/AWSCertifications/comments/1ohz11h/ill_be_making_a_free_genai_developer_professional/)
- [Frank Kane](https://www.linkedin.com/posts/fkane_cranking-away-on-developing-a-prep-course-activity-7396994028996833280-_41D)
- [Tutorials Dojo](https://tutorialsdojo.com/aws-certified-generative-ai-developer-professional-study-path-aip-c01-exam-guide/)
	- TD also released a [FREE sampler](https://portal.tutorialsdojo.com/product/free-aws-certified-generative-ai-developer-professional-practice-exams-aip-c01-sampler/) with 30 practice questions before the official exam guide was out. I went ahead and recorded myself answering TD's sampler, so if you'd like to tackle the questions along with me, do check my video below!

https://www.youtube.com/watch?v=HhqljbR0hLk

## I will attempt the Beta exam myself!
Since I did well in Tutorial's Dojo sampler and I'm finding the AWS Skill Builder course interesting and fascinating, at this point I have warmed up to the idea of taking the Beta exam of the AIP certification. I will probably not take it on the 16th of December since I will already be enjoying some Christmas vacation, but I do think tackling it sometime in January is realistic. By then I hope that Tutorials Dojo has refined their practice exams and I can hone my claws and feel confident about the exam. It will be my first professional AWS certification, so in a way it's also exciting (even if I'm not looking forward to a 4-hour exam! 😨). Stay tuned in my blog and social media to know how it goes for me in the next few weeks! And if you will attempt the exam yourself, best of luck! 🍀
