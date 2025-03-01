// This file contains the code that will be injected into the Shopify store's cart page

export const cartSurveyScript = `
(function() {
  // Configuration - this would be dynamically generated based on the merchant's settings
  const surveyConfig = {
    title: "Cart Feedback Survey",
    description: "Help us improve your shopping experience by answering a few quick questions.",
    questions: [
      {
        id: "q1",
        text: "How satisfied are you with your shopping experience?",
        type: "rating",
        required: true
      },
      {
        id: "q2",
        text: "What is the primary reason for your purchase today?",
        type: "multiple_choice",
        options: ["Personal use", "Gift", "Business", "Other"],
        required: true
      },
      {
        id: "q3",
        text: "Any additional comments about your experience?",
        type: "text",
        required: false
      }
    ]
  };

  // Check if we're on the cart page
  if (window.location.pathname.includes('/cart')) {
    // Create survey container
    const surveyContainer = document.createElement('div');
    surveyContainer.id = 'causal-funnel-survey';
    surveyContainer.style.position = 'fixed';
    surveyContainer.style.bottom = '20px';
    surveyContainer.style.right = '20px';
    surveyContainer.style.width = '350px';
    surveyContainer.style.maxWidth = '90vw';
    surveyContainer.style.zIndex = '9999';
    surveyContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    surveyContainer.style.borderRadius = '8px';
    surveyContainer.style.backgroundColor = '#ffffff';
    
    // Check if user has already completed the survey in this session
    const surveyCompleted = sessionStorage.getItem('causalFunnelSurveyCompleted');
    
    if (!surveyCompleted) {
      // Add delay before showing the survey
      setTimeout(() => {
        document.body.appendChild(surveyContainer);
        renderSurvey();
      }, 3000);
    }
  }

  function renderSurvey() {
    const container = document.getElementById('causal-funnel-survey');
    if (!container) return;
    
    // Create survey HTML
    let html = \`
      <div style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0;">\${surveyConfig.title}</h2>
          <button id="causal-funnel-close" style="background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
        </div>
        <p style="margin-bottom: 16px; color: #666;">\${surveyConfig.description}</p>
        <form id="causal-funnel-form">
    \`;
    
    // Add questions
    surveyConfig.questions.forEach(question => {
      html += \`
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: 500; margin-bottom: 8px;">
            \${question.text}
            \${question.required ? '<span style="color: #e53e3e; margin-left: 4px;">*</span>' : ''}
          </label>
      \`;
      
      if (question.type === 'text') {
        html +=  : ''}
          </label>
      \`;
      
      if (question.type === 'text') {
        html += \`
          <textarea 
            id="\${question.id}" 
            name="\${question.id}" 
            rows="4" 
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"
            \${question.required ? 'required' : ''}
          ></textarea>
        \`;
      } else if (question.type === 'multiple_choice' && question.options) {
        html += \`<div>\`;
        question.options.forEach((option, index) => {
          html += \`
            <div style="margin-bottom: 8px;">
              <input 
                type="radio" 
                id="\${question.id}_\${index}" 
                name="\${question.id}" 
                value="\${option}"
                \${question.required ? 'required' : ''}
              >
              <label for="\${question.id}_\${index}" style="margin-left: 8px;">\${option}</label>
            </div>
          \`;
        });
        html += \`</div>\`;
      } else if (question.type === 'rating') {
        html += \`
          <div style="display: flex; gap: 8px;">
            <input type="hidden" id="\${question.id}" name="\${question.id}" \${question.required ? 'required' : ''}>
        \`;
        
        for (let i = 1; i <= 5; i++) {
          html += \`
            <button 
              type="button" 
              class="rating-btn" 
              data-question="\${question.id}" 
              data-value="\${i}"
              style="width: 40px; height: 40px; border-radius: 50%; background-color: #f3f4f6; border: none; cursor: pointer;"
            >
              \${i}
            </button>
          \`;
        }
        
        html += \`</div>\`;
      }
      
      html += \`</div>\`;
    });
    
    // Add submit button
    html += \`
        <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
          <button type="button" id="causal-funnel-skip" style="margin-right: 8px; padding: 8px 16px; background: none; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">Skip</button>
          <button type="submit" style="padding: 8px 16px; background-color: #5c6ac4; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
        </div>
      </form>
      </div>
    \`;
    
    container.innerHTML = html;
    
    // Add event listeners
    document.getElementById('causal-funnel-close').addEventListener('click', closeSurvey);
    document.getElementById('causal-funnel-skip').addEventListener('click', closeSurvey);
    document.getElementById('causal-funnel-form').addEventListener('submit', submitSurvey);
    
    // Add rating button event listeners
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const questionId = this.getAttribute('data-question');
        const value = this.getAttribute('data-value');
        
        // Update hidden input
        document.getElementById(questionId).value = value;
        
        // Update button styles
        document.querySelectorAll(\`.rating-btn[data-question="\${questionId}"]\`).forEach(b => {
          b.style.backgroundColor = '#f3f4f6';
          b.style.color = '#000';
        });
        
        this.style.backgroundColor = '#5c6ac4';
        this.style.color = '#fff';
      });
    });
  }

  function submitSurvey(e) {
    e.preventDefault();
    
    const form = document.getElementById('causal-funnel-form');
    const formData = new FormData(form);
    const responses = {};
    
    for (let [key, value] of formData.entries()) {
      responses[key] = value;
    }
    
    // Add metadata
    responses.timestamp = new Date().toISOString();
    responses.pageUrl = window.location.href;
    responses.cartItems = getCartItems();
    
    // Send data to server
    fetch('https://your-app-domain.com/api/survey/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responses),
    })
    .then(response => response.json())
    .then(data => {
      // Show thank you message
      const container = document.getElementById('causal-funnel-survey');
      container.innerHTML = \`
        <div style="padding: 16px; text-align: center;">
          <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Thank You!</h2>
          <p style="margin-bottom: 16px;">Your feedback is valuable to us.</p>
          <button id="causal-funnel-close-final" style="padding: 8px 16px; background-color: #5c6ac4; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
        </div>
      \`;
      
      document.getElementById('causal-funnel-close-final').addEventListener('click', closeSurvey);
      
      // Mark as completed in this session
      sessionStorage.setItem('causalFunnelSurveyCompleted', 'true');
    })
    .catch(error => {
      console.error('Error submitting survey:', error);
    });
  }

  function closeSurvey() {
    const container = document.getElementById('causal-funnel-survey');
    if (container) {
      container.remove();
    }
  }

  function getCartItems() {
    // This function would extract cart items from the page
    // The implementation depends on the Shopify theme structure
    // This is a simplified example
    const cartItems = [];
    
    try {
      // Try to get cart items from window.Shopify object if available
      if (window.Shopify && window.Shopify.cart && window.Shopify.cart.items) {
        return window.Shopify.cart.items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price
        }));
      }
      
      // Fallback: try to parse from DOM
      const itemElements = document.querySelectorAll('.cart-item, .cart__item');
      itemElements.forEach(el => {
        const titleEl = el.querySelector('.cart-item__title, .cart__item-title');
        const priceEl = el.querySelector('.cart-item__price, .cart__item-price');
        
        if (titleEl) {
          cartItems.push({
            title: titleEl.textContent.trim(),
            price: priceEl ? priceEl.textContent.trim() : 'N/A'
          });
        }
      });
    } catch (error) {
      console.error('Error getting cart items:', error);
    }
    
    return cartItems;
  }
})();
`

