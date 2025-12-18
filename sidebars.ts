import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Textbook sidebar with 4 main modules
  textbookSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Module 1: Physical AI Fundamentals',
      items: [
        'module-1/index',
        'module-1/physical-ai-fundamentals',
        'module-1/embodied-intelligence',
        'module-1/ai-physical-world'
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 2: ROS 2 as Robotic Nervous System',
      items: [
        'module-2/index',
        'module-2/ros2-overview',
        'module-2/robotic-nervous-system',
        'module-2/communication-patterns'
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 3: Simulation and AI Integration',
      items: [
        'module-3/index',
        'module-3/simulation-essentials',
        'module-3/digital-twins',
        'module-3/nvidia-isaac'
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action Systems',
      items: [
        'module-4/index',
        'module-4/vision-language-action',
        'module-4/human-robot-interaction',
        'module-4/conversational-robotics'
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Hardware Overview',
      items: [
        'hardware/hardware-overview'
      ],
      collapsed: true,
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    }
  ],
};

export default sidebars;
