import React from 'react'

const About = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#fffafc', color: '#333' }}>
    {/* Hero Section */}
    <div style={{ backgroundColor: '#ffaa2b', color: 'white', textAlign: 'center', padding: '60px 20px 40px' }}><br/>
    <br/>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>ABOUT US</h1>
      <p style={{ fontSize: '24px', fontWeight: 500 }}>
        THE MOST <span style={{ color: '#ffffff', fontWeight: 'bold' }}>❤️ LOVED</span> ICE CREAM SINCE 2024
      </p>
    </div>

    {/* Wave Divider */}
    <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '-1px' }}>
      <path fill="#ffaa2b" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,74.7C672,53,768,43,864,64C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
    </svg>

    {/* About Content */}
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontSize: '18px', lineHeight: '1.7' }}>
      <p><strong>Frozen Magic</strong> is a beloved name in the world of ice creams, founded in 2024 with a mission to make every scoop magical. From a small spark of an idea, we've become a go-to brand for delicious frozen treats that bring joy to people of all ages.</p>

      <p>Our journey began with passion and innovation, blending taste and quality in every bite. We believe in using the finest ingredients, maintaining a fun and creative atmosphere, and always keeping our customers at the heart of everything we do.</p>

      <p>With over <strong>150+ mouth-watering items</strong> in our menu including cones, sundaes, candy sticks, fruit-based cups and more — we’re constantly exploring new flavors and experiences to keep our fans coming back for more.</p>

      <p>Today, Frozen Magic is proud to spread sweetness across cities, serving thousands of happy customers and continuing to grow our icy legacy one scoop at a time. 🍦💛</p>
    </div>
  </div>
  )
}

export default About
