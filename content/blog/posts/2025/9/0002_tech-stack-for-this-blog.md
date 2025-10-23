---
title: Tech Stack for this Blog
description: A brief description of the tech stack I'm initially using for my blog, and why I chose this tech stack and discarded other options
date: 2025-09-08
tags: ["blogging", "eleventy", "data ownership", "static site generator"]
---
<img src="https://images.unsplash.com/photo-1724331340434-caf61e68c168?q=80&w=2428&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="a-computer-generated-image-of-a-multicolored-building">

<center>

Photo by [BoliviaInteligente](https://unsplash.com/@boliviainteligente?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-computer-generated-image-of-a-multicolored-building-cG9xY_1NBcA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

</center>

Online blogging is not completely new to me. More than 10 years ago, I wrote some entries in Blogspot (nowadays [Blogger.com](https://www.blogger.com/)). That feels forever ago. When wanting to start blogging again, I knew I didn't want to do so in [Medium](https://medium.com/), [LinkedIn Articles](https://www.linkedin.com/help/linkedin/answer/a522427), or other commercial platforms. Sure, one can start blogging there immediately, but I knew I wanted to have complete control over my content and my data, and I also didn't want my content to be served or hidden by internal algorithms in those platforms. And, worst of all, I don't want my blog content to be teased and then locked behind a paywall like it usually happens in [Medium](https://medium.com/). If I sell written content, it will not be tied to this blog, which I want to keep free to access.

[WordPress](https://wordpress.com/) has been a well-known platform for hosting your own blog and its data. I somehow never liked its bloated CMS, though. Nor its performance. And while I coded a whole blog platform back in university 15 years ago, I definitely did not want to start from scratch either. To those who are curious, that happened before frontend frameworks were as popular as these days—we did use [Express.js](https://expressjs.com/) for the backend, but the frontend was pure JavaScript: just `.ejs` files!

What about static site generators? They're sort of an intermediate solution between fully-managed blog platforms and your completely self-managed blog. I have learned about them, and about [Eleventy](https://www.11ty.dev/) in particular, thanks to [Juhis](https://hamatti.org/) and his blog. They offer some really attractive advantages to me: local `.md` Markdown files for blog posts that I can easily migrate to other platforms if I so choose, plus middleware that can generate static HTML pages automatically from them. It's all static HTML frontend, there's no backend nor loading JavaScript, so it all is very lightweight and fast to load. Sounds like a great deal! The catch? There is a slight learning curve to [Eleventy](https://www.11ty.dev/) and static site generators. But it hasn't felt terribly steep so far to me! Going through the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) project and referencing some docs helped me put together this blog without much difficulty.

Of course, you also then need to host your blog somewhere online. Since my website has been hosted in [AWS](https://aws.amazon.com/) for many months as a static site in [Amazon S3](https://aws.amazon.com/s3) and served via [Amazon CloudFront](https://aws.amazon.com/cloudfront/), I simply decided to deploy the blog along my website. It's quite cheap if you know what you're doing, but there are of course alternatives like [Netlify](https://www.netlify.com/) out there.

Let's see if my tech stack changes in the future!
