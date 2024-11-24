const classifyUrl = (url) => {
    try {
      // Parse the URL
      const { hostname, pathname } = new URL(url);
  
      // Extract website name from hostname (e.g., "twitter.com" -> "Twitter")
      const websiteName = hostname
        .replace("www.", "") // Remove "www."
        .split(".")[0] // Get the main domain
        .charAt(0) // Capitalize the first letter
        .toUpperCase() + hostname.replace("www.", "").split(".")[0].slice(1);
  
      // Mapping of known domains to platforms
      const domainMap = {
        "Twitter": /(?:twitter|x)\.com/,
        "YouTube": /youtube\.com|youtu\.be/,
        "Instagram": /instagram\.com/,
        "Facebook": /facebook\.com/,
        "TikTok": /tiktok\.com/,
        "GitHub": /github\.com/,
        "LinkedIn": /linkedin\.com/,
      };
  
      const fileTypeMap = {
        "PDF": /\.pdf$/,
        "Image": /\.(png|jpe?g|gif|webp)$/,
        "GIF": /\.gif$/,
        "Video": /\.(mp4|mov|avi|webm|mkv)$/,
        "Shorts": /\/shorts\//, 
        "Audio": /\.(mp3|wav|aac|ogg)$/,
        "Document": /\.(docx?|xlsx?|pptx?|txt)$/,
      };
  
      // Detect platform based on hostname
      let platform = websiteName; // Default to the website name
      for (const [name, regex] of Object.entries(domainMap)) {
        if (regex.test(hostname)) {
          platform = name;
          break;
        }
      }
  
      // Detect file type based on pathname
      let fileType = "Unknown File Type";
      for (const [type, regex] of Object.entries(fileTypeMap)) {
        if (regex.test(pathname)) {
          fileType = type;
          break;
        }
      }
  
      return { domain: platform, fileType };
    } catch (error) {
      return { domain: "Invalid URL", fileType: "Invalid URL" };
    }
};

export default classifyUrl
  
// return : { domain: '', fileType: 'Unknown File Type' }

  