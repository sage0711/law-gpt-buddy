# Deployment Guide

This guide covers deploying the Canadian Personal Injury Law Assistant to production.

## Prerequisites

- ✅ Supabase account with project created
- ✅ OpenAI API key with GPT-5 access
- ✅ Deployment platform account (Vercel/Netlify/etc.)

## Step-by-Step Deployment

### 1. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project initialization

#### Configure Edge Function
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Set OpenAI API key
supabase secrets set OPENAI_API_KEY=sk-your-openai-api-key

# Deploy the chat function
supabase functions deploy chat
```

#### Get API Keys
1. Go to Project Settings > API
2. Copy the following:
   - Project URL (`VITE_SUPABASE_URL`)
   - Anon/Public Key (`VITE_SUPABASE_ANON_KEY`)

### 2. Vercel Deployment (Recommended)

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

#### Option B: Deploy via GitHub
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### 3. Netlify Deployment

#### Option A: Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables
netlify env:set VITE_SUPABASE_URL your_supabase_url
netlify env:set VITE_SUPABASE_ANON_KEY your_anon_key
```

#### Option B: Via Netlify Dashboard
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder
4. Go to Site Settings > Environment Variables
5. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Trigger redeploy

### 4. Custom Domain Setup

#### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

#### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS (Netlify DNS or external)
4. Enable HTTPS

### 5. Environment Variables

Required for all deployments:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

⚠️ **Important**: Never commit `.env` file to git. Use `.env.example` for reference.

## Post-Deployment Checklist

- [ ] Test chat functionality
- [ ] Verify AI responses are working
- [ ] Test dark mode toggle
- [ ] Check conversation history saving
- [ ] Test export functionality
- [ ] Verify mobile responsiveness
- [ ] Test keyboard shortcuts
- [ ] Check legal disclaimer visibility
- [ ] Verify all environment variables
- [ ] Test error handling

## Performance Optimization

### 1. Enable Caching
Add to `vercel.json` or `netlify.toml`:

**Vercel:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Netlify:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2. Optimize Build
```bash
# Analyze bundle size
npm run build -- --mode production

# Check for unused dependencies
npx depcheck
```

### 3. Enable Compression
- Vercel and Netlify enable gzip/brotli automatically
- Ensure build output is optimized

## Monitoring & Analytics

### Supabase Monitoring
1. Go to Supabase Dashboard > Logs
2. Monitor Edge Function logs
3. Check for API errors

### Application Monitoring
Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for usage stats
- **LogRocket** for session replay

## Security Best Practices

1. **API Keys**
   - Never expose OpenAI API key in frontend
   - Keep it in Supabase Edge Function secrets
   - Rotate keys regularly

2. **CORS Configuration**
   - Verify CORS headers in Edge Function
   - Restrict to your domain in production

3. **Rate Limiting**
   - Implement rate limiting in Edge Function
   - Add user-based throttling if needed

4. **Content Security Policy**
   Add CSP headers:
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
   ```

## Troubleshooting

### OpenAI API Not Working
```bash
# Check Edge Function logs
supabase functions logs chat

# Verify API key
supabase secrets list

# Test Edge Function locally
supabase functions serve chat
```

### Build Failures
```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### Environment Variables Not Loading
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check deployment logs

## Cost Estimation

### Expected Costs (Monthly)
- **Supabase**: Free tier (up to 500MB database)
- **OpenAI API**: ~$20-100 (depending on usage)
- **Vercel/Netlify**: Free tier (hobby projects)
- **Custom Domain**: ~$10-15/year

### Production Costs
- Consider OpenAI API usage limits
- Monitor API costs in OpenAI dashboard
- Set up billing alerts

## Maintenance

### Regular Tasks
- [ ] Monitor OpenAI API usage
- [ ] Check Supabase logs weekly
- [ ] Update dependencies monthly
- [ ] Review and rotate API keys quarterly
- [ ] Backup conversation data (if added)
- [ ] Test all features after updates

### Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [OpenAI API Documentation](https://platform.openai.com/docs)

---

For additional help, please refer to the main README.md or open an issue on GitHub.

