# Portfolio Setup Guide

## How to Add Your Profile Image

1. **Prepare your image:**
   - Take a professional headshot photo
   - Make it square (1:1 aspect ratio works best)
   - Recommended size: 400x400 pixels or larger
   - Format: JPG or PNG

2. **Add to your portfolio:**
   - Save your image as `profile.jpg` in the `f:\Porfolio-siam\public\images\` folder
   - The code is already set up to use this image
   - If you use a different filename, update line 193 in main.jsx

## Deployment to siambinhasan.me

### Option 1: Using Vercel (Recommended - Free & Easy)

1. **Prepare for deployment:**
   - Create a GitHub account if you don't have one
   - Create a new repository called "portfolio"
   - Upload all your files to GitHub

2. **Deploy with Vercel:**
   - Go to vercel.com
   - Sign up with GitHub
   - Import your repository
   - Vercel will auto-detect it's a Vite project
   - Deploy automatically

3. **Custom domain setup:**
   - In Vercel dashboard, go to your project settings
   - Click "Domains"
   - Add "siambinhasan.me"
   - Follow Vercel's DNS instructions
   - Update your domain's DNS records as instructed

### Option 2: Using Netlify

1. **Deploy to Netlify:**
   - Go to netlify.com
   - Drag and drop your `dist` folder
   - Or connect your GitHub repository

2. **Custom domain:**
   - In site settings, add custom domain "siambinhasan.me"
   - Follow DNS instructions

### Option 3: Traditional Web Hosting

1. **Upload files:**
   - Use FTP/cPanel to upload contents of `dist` folder to your web host
   - Point siambinhasan.me to your hosting account

## Your Portfolio Features

✅ **Responsive design** - Works on all devices
✅ **Dark/Light mode** - Automatic system preference detection
✅ **Professional sections** - Hero, About, Learning, Contact
✅ **Contact form** - Ready for backend integration
✅ **SEO optimized** - Meta tags and proper structure
✅ **Fast loading** - Optimized build

## Current Status

- ✅ Portfolio built and ready
- ✅ Updated with your real information
- ✅ Removed placeholder projects
- ✅ Added "What I'm Learning" section
- 📋 Next: Add your profile image
- 📋 Next: Deploy to siambinhasan.me

Your portfolio showcases your skills effectively even as a student!
