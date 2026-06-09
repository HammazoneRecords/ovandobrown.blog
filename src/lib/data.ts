export type Post = {
  slug: string;
  title: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  readingTime: number;
  listeningTime: number;
  prerequisites: string[];
};

export type Comment = {
  id: number;
  author: string;
  authorImage: string;
  text: string;
  timestamp: string;
};

function calculateDurations(content: string): { readingTime: number, listeningTime: number } {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 225); // Average reading speed
  const listeningTime = Math.ceil(words / 150); // Average listening speed
  return { readingTime, listeningTime };
}

const userImage = "https://firebasestorage.googleapis.com/v0/b/orbital-narratives.firebasestorage.app/o/f6ffc474-5817-4025-9db9-689b6455913b_removalai_preview.png?alt=media&token=5f9efeb3-2c5d-47d1-8f6a-300d40483e89";

const postData: Omit<Post, 'readingTime' | 'listeningTime'>[] = [
    {
    slug: '100-ideas-to-help-the-blind',
    title: '100 Ideas to Help the Blind',
    category: 'Lifestyle',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'July 27, 2025',
    image: userImage,
    excerpt: 'A comprehensive list of innovative ideas and practical solutions to empower and assist the blind community.',
    content: `
# 100 Ideas to Help the Blind

This post is dedicated to exploring innovative, practical, and compassionate ideas to enhance the lives of blind and visually impaired individuals. From low-tech solutions to cutting-edge technology, our goal is to spark conversations and inspire action. Here are just a few ideas to get us started.

## Daily Living & Independence

1.  **Tactile Markers:** Use tactile dots or markers (like puffy paint or clear nail polish) on appliances like microwaves, washing machines, and remote controls to mark key buttons (e.g., start, power, specific settings).
2.  **Smart Home Integration:** Leverage voice assistants like Amazon Alexa or Google Home to control lights, thermostats, locks, and entertainment systems, providing a hands-free way to manage the home environment.
3.  **App-Based Grocery Services:** Utilize apps that offer grocery delivery and shopping assistance, which can read out items and allow for easy reordering.
4.  **Audio-Described Media:** Actively seek out and support streaming services and movie theaters that provide audio description tracks for movies and TV shows.

## Technology & Innovation

5.  **AI-Powered Navigation Canes:** Develop "smart canes" equipped with ultrasonic sensors and GPS to detect obstacles from a distance and provide haptic feedback or audio cues about the environment.
6.  **Wearable Assistance Devices:** Devices like the OrCam MyEye or Envision Glasses can clip onto any pair of glasses and use a camera to read text, recognize faces, identify products, and more, speaking the information to the user.
7.  **Haptic Feedback for Gaming:** Create video game controllers and software that use advanced haptics to translate visual cues into tactile sensations, making gaming more accessible and immersive.
8.  **Be My Eyes App:** Promote and volunteer for the "Be My Eyes" app, which connects blind and low-vision individuals with sighted volunteers through a live video call to help with tasks like reading labels or navigating new surroundings.

This is just the beginning of a much larger conversation. What are your ideas? Share them in the comments below!
`,
    prerequisites: [],
  },
  {
    slug: 'the-genesis-of-ovandobrown-blog',
    title: 'The Genesis of ovandoBrown.blog',
    category: 'Meta',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'August 15, 2024',
    image: userImage,
    excerpt: 'A look into why this space was created and the vision for the stories it will hold. From Jamaica to the digital cosmos.',
    content: `
# The Genesis of ovandoBrown.blog

Welcome to the maiden voyage of ovandoBrown.blog. This is more than just a blog; it's a digital canvas, a space station for thoughts, and a launchpad for ideas originating from my corner of the world in Jamaica. 

For the longest time, I've been captivated by the intersection of technology, culture, and human potential. I've witnessed how digital waves create ripples that transform our shores, and I've felt the pull of the global digital tide. This blog is my attempt to chart these currents, to share my perspective, and to connect with fellow travelers in this vast digital expanse.

## Why "ovandoBrown.blog"?

The name reflects the core philosophy of this space. It's my name, and it's my blog. It's a direct line to my thoughts and experiences.

"Narratives" are the stories we tell ourselves and each other. They shape our reality. Here, I want to deconstruct and reconstruct narratives about technology in the Caribbean, about personal growth in a hyper-connected world, and about the future we are collectively building.

## What to Expect

Here’s a glimpse of the orbits we'll be exploring:

*   **Tech Trajectories:** Deep dives into emerging technologies, software development, and their impact on a developing nation like Jamaica.
*   **Cultural Coordinates:** Explorations of how digital culture is evolving and interacting with our vibrant local heritage.
*   **Personal Growth Vectors:** Reflections on productivity, learning, and navigating a career in the digital age.

This is just the beginning. The ship has left the dock. I invite you to join me on this journey. Let's explore the orbits together.
`,
    prerequisites: ['100-ideas-to-help-the-blind'],
  },
  {
    slug: 'navigating-the-digital-tide-in-the-caribbean',
    title: 'Navigating the Digital Tide in the Caribbean',
    category: 'Technology',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'August 22, 2024',
    image: userImage,
    excerpt: 'Exploring the unique challenges and opportunities for tech innovation within the Caribbean landscape.',
    content: `
# Navigating the Digital Tide in the Caribbean

The Caribbean is often seen as a place of sun, sea, and sand. But beneath this idyllic surface, a powerful digital tide is rising, bringing with it both unprecedented opportunities and unique challenges. For those of us in the tech space here, navigating this tide requires a different kind of map.

## The Opportunities: A Silicon Sea

The potential for tech innovation in the Caribbean is immense. We have:

*   **A Young, Tech-Savvy Population:** A generation that grew up with the internet is eager to create and innovate.
*   **Untapped Markets:** Many sectors are ripe for digital transformation, from tourism to finance.
*   **A Unique Cultural Perspective:** Our rich culture can inspire new forms of digital content, services, and products that have global appeal.

## The Challenges: Navigating the Reefs

However, we also face significant hurdles:

*   **Infrastructure Gaps:** Internet access can be unreliable and expensive in some areas.
*   **Access to Capital:** Securing funding for tech startups remains a major challenge.
*   **Brain Drain:** Many of our brightest minds are lured away by opportunities in North America and Europe.

To truly harness the digital tide, we need to build a stronger ecosystem. This means investing in education, fostering a culture of entrepreneurship, and creating policies that support local innovation. The future is digital, and the Caribbean must be ready to sail.
`,
    prerequisites: ['the-genesis-of-ovandobrown-blog'],
  },
  {
    slug: 'the-art-of-asynchronous-communication',
    title: 'The Art of Asynchronous Communication',
    category: 'Productivity',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'August 29, 2024',
    image: userImage,
    excerpt: 'In a globally connected world, mastering asynchronous communication is not just a skill, it\'s a superpower.',
    content: `
# The Art of Asynchronous Communication

In our hyper-connected, always-on world, the pressure to respond instantly is immense. We are tethered to our devices, slaves to the notification bell. But what if there was a better way? Enter asynchronous communication.

Asynchronous communication is the art of communicating without the expectation of an immediate response. It's the difference between a phone call (synchronous) and an email (asynchronous). In a remote or globally distributed team, it's not just a nice-to-have; it's a necessity.

## The Benefits of Going Async

*   **Deeper Focus:** Fewer interruptions mean more time for deep, focused work.
*   **Thoughtful Responses:** Time to process information leads to more considered and higher-quality replies.
*   **Timezone Independence:** It's the only way for global teams to work together effectively.
*   **A Written Record:** It creates a searchable history of communication and decisions.

## How to Master It

1.  **Over-communicate:** Provide as much context as possible in your initial message. Don't make the other person ask for more information.
2.  **Use the Right Tools:** Leverage project management software, documents, and tools designed for async collaboration.
3.  **Set Clear Expectations:** Let your team know when they can expect a response from you.
4.  **Respect Others' Time:** Don't use DMs for things that could be a comment or an email.

Mastering asynchronous communication is a paradigm shift. It requires discipline and a change in mindset, but the rewards in productivity and peace of mind are immeasurable.
`,
    prerequisites: ['navigating-the-digital-tide-in-the-caribbean'],
  },
  {
    slug: 'a-love-letter-to-the-command-line',
    title: 'A Love Letter to the Command Line',
    category: 'Software Development',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'September 5, 2024',
    image: userImage,
    excerpt: 'Why the humble terminal remains the most powerful tool in a developer\'s arsenal in the age of GUIs.',
    content: `
# A Love Letter to the Command Line

In an era of sleek graphical user interfaces, with their intuitive buttons and windows, the command line interface (CLI) can seem like a relic of a bygone era. A blinking cursor on a black screen. But for developers, this simple interface is the epicenter of power and productivity.

## The Power of the Prompt

Why do so many of us still swear by the command line?

*   **Speed and Efficiency:** Once you know the commands, you can perform complex tasks far faster than by clicking through menus.
*   **Automation and Scripting:** The CLI is the foundation of automation. You can chain commands together and write scripts to handle repetitive tasks with ease.
*   **Control and Precision:** You have direct, granular control over your system and tools. No hidden settings, no ambiguous options.
*   **Universality:** The command line is everywhere, from your local machine to the most powerful cloud servers. It's the lingua franca of developers.

The learning curve can be steep, but the investment pays dividends for a lifetime. The command line is not just a tool; it's a way of thinking. It teaches you to break down problems into smaller, manageable steps and to think about how systems work at a fundamental level. It's a timeless skill that will serve you well, no matter how much GUIs evolve.
`,
    prerequisites: ['the-art-of-asynchronous-communication'],
  },
  {
    slug: 'life-as-a-digital-nomad-in-the-caribbean',
    title: 'The Realities of Digital Nomadism in the Caribbean',
    category: 'Lifestyle',
    author: 'Ovando Brown',
    authorImage: userImage,
    date: 'September 12, 2024',
    image: userImage,
    excerpt: 'Beyond the picturesque beaches and vibrant culture, what is it really like to work remotely from the islands?',
    content: `
# The Realities of Digital Nomadism in the Caribbean

The idea of being a digital nomad in the Caribbean is a powerful fantasy: swapping your office cubicle for a beachside hammock, your laptop powered by sunshine and inspiration. While there's truth to the dream, the reality is a nuanced picture of paradise and practicality.

## The Dream: Working in Paradise

There's no denying the appeal. The work-life balance can be incredible. Imagine finishing your workday and immediately stepping out for a swim in turquoise waters or enjoying a sunset with fresh coconut water. The lifestyle is more relaxed, the culture is rich and welcoming, and the natural beauty is a constant source of inspiration. For many, it's a chance to escape the rat race and reconnect with what truly matters.

## The Reality: Practical Hurdles

However, it's not all smooth sailing. Aspiring nomads must contend with:

*   **Connectivity Issues:** While improving, internet infrastructure can be a significant challenge. Reliable, high-speed internet is not a given and often comes at a premium. Power outages can also disrupt a workday.
*   **Cost of Living:** While some islands are affordable, many popular destinations have a high cost of living, especially for imported goods and modern housing.
*   **Bureaucracy and Visas:** Navigating visa requirements and work permits can be a complex and time-consuming process. Not all Caribbean nations have specific "digital nomad" visas, making long-term stays complicated.
*   **Island Fever:** The initial euphoria can sometimes give way to a sense of isolation, especially if you're far from friends and family. The slower pace of life, while a blessing, can also be an adjustment.

Being a digital nomad in the Caribbean is an incredible opportunity, but it requires thorough research, planning, and a flexible mindset. It's about balancing the dream with the practical realities to create a sustainable and fulfilling lifestyle.
`,
    prerequisites: ['a-love-letter-to-the-command-line'],
  },
];

export const posts: Post[] = postData.map(post => ({
  ...post,
  ...calculateDurations(post.content),
}));


export const comments: { [key: string]: Comment[] } = {
  'the-genesis-of-ovandobrown-blog': [
    {
      id: 1,
      author: 'Aisha',
      authorImage: 'https://placehold.co/100x100',
      text: 'Love the vision! Excited to see where this journey takes you. Jamaica has so many stories to tell in the tech space.',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      author: 'David',
      authorImage: 'https://placehold.co/100x100',
      text: 'Great first post. The name "ovandoBrown.blog" is very fitting. Looking forward to more content.',
      timestamp: '1 day ago',
    },
  ],
  'navigating-the-digital-tide-in-the-caribbean': [
    {
      id: 3,
      author: 'Maria',
      authorImage: 'https://placehold.co/100x100',
      text: 'This really hits home. The "brain drain" is a serious issue we need to address collectively.',
      timestamp: '5 hours ago',
    },
  ],
};
