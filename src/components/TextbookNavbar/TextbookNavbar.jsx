import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import './TextbookNavbar.css';

const TextbookNavbar = () => {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  // Define the navigation structure for our textbook
  const textbookNavigation = [
    {
      title: 'Module 1',
      path: '/docs/module-1',
      description: 'Physical AI Fundamentals'
    },
    {
      title: 'Module 2', 
      path: '/docs/module-2',
      description: 'ROS 2 as Robotic Nervous System'
    },
    {
      title: 'Module 3',
      path: '/docs/module-3', 
      description: 'Simulation and AI Integration'
    },
    {
      title: 'Module 4',
      path: '/docs/module-4',
      description: 'Vision-Language-Action Systems'
    },
    {
      title: 'Hardware',
      path: '/docs/hardware/hardware-overview',
      description: 'Hardware Overview'
    }
  ];

  return (
    <div className="textbook-navbar">
      <div className="textbook-navbar-inner container">
        <div className="textbook-navbar-content">
          <h2 className="textbook-navbar-title">Textbook Navigation</h2>
          <div className="textbook-navbar-links">
            {textbookNavigation.map((module, index) => (
              <div 
                key={index} 
                className={clsx(
                  'textbook-navbar-link-item',
                  location.pathname.startsWith(module.path) && 'textbook-navbar-link-item--active'
                )}
              >
                <Link 
                  to={module.path} 
                  className={clsx(
                    'textbook-navbar-link',
                    location.pathname.startsWith(module.path) && 'textbook-navbar-link--active'
                  )}
                >
                  <div className="textbook-navbar-link-title">{module.title}</div>
                  <div className="textbook-navbar-link-desc">{module.description}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextbookNavbar;