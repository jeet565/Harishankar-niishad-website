import { supabase } from "./supabase.js";

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Sunwai Form Submission (Supabase + Email Notification)
const sunwaiForm = document.querySelector('.sunwai-form');
if (sunwaiForm) {
    sunwaiForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = sunwaiForm.querySelector('input[name="name"]').value;
        const mobile = sunwaiForm.querySelector('input[name="mobile"]').value;
        const category = sunwaiForm.querySelector('select[name="category"]').value;
        const message = sunwaiForm.querySelector('textarea[name="message"]').value;
        const trackingId = 'HSN-' + Math.floor(100000 + Math.random() * 900000);
        
        try {
            // 1. Save to Supabase Database
            const { error: insertError } = await supabase
                .from('complaints')
                .insert([
                    { name, mobile, category, message, tracking_id: trackingId }
                ]);
            
            if (insertError) throw insertError;
            
            // 2. Send Email Notification to jilapanchayat02@gmail.com
            try {
                await fetch("https://formsubmit.co/ajax/jilapanchayat02@gmail.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        _subject: `🔔 नई शिकायत - ${category} | ${trackingId}`,
                        "शिकायतकर्ता का नाम": name,
                        "मोबाइल नंबर": mobile,
                        "समस्या का प्रकार": category,
                        "समस्या विवरण": message,
                        "ट्रैकिंग आईडी": trackingId,
                        "समय": new Date().toLocaleString('hi-IN'),
                        _template: "table"
                    })
                });
            } catch (emailErr) {
                console.log("Email notification failed (non-critical):", emailErr);
            }
            
            alert(`आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है।\nआपका ट्रैकिंग आईडी: ${trackingId}\n\nशीघ्र ही आपसे संपर्क किया जाएगा।`);
            sunwaiForm.reset();
        } catch (error) {
            alert('त्रुटि: शिकायत दर्ज करने में समस्या आई। कृपया पुनः प्रयास करें।');
            console.error(error);
        }
    });
}
