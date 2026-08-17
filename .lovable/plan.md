# Plan: Final Production Readiness & Polish

I will finalize all remaining frontend and backend processes to ensure ORTEQ India is ready for a world-class production launch.

### **Plan: Production Launch Finalization**

#### **1. Frontend: Complete & Polish**
*   **`src/routes/downloads.tsx`**: Update "Request" buttons to link to a dynamic inquiry form or prompt for email, rather than being dead links.
*   **`src/routes/dealer.tsx`**: Link the "Ready to apply?" section directly to the authenticated Dealer Portal application flow.
*   **`src/routes/blog.tsx`**: Ensure the blog cards have consistent layout and a "Read More" feel, even for placeholders.
*   **`src/routes/support.tsx`**: Link the public support form to the authenticated Support Portal for tracking.
*   **SEO Audit**: Ensure every route has a unique `head()` metadata block with proper OpenGraph tags.

#### **2. Backend: Hardening & Wiring**
*   **Public Forms**: Update public Contact and Support forms to save entries into the database (leads/tickets) if the user is authenticated, or redirect to Login/Register if they aren't.
*   **CMS Data Sync**: Verify all `site-data.ts` fields are correctly mapped in the Admin CMS to allow the client to take over content management immediately.
*   **RLS Verification**: One final pass to ensure `authenticated` users can only see their own data while `admin`/`staff` can see everything.

#### **3. Production Assets**
*   **`public/favicon.ico`**: Ensure the ORTEQ logo is reflected in the favicon.
*   **`public/logo.png`**: Confirm the manual logo upload fallback is working as intended.

---

### **Technical Details**
*   **Database**: All tables (`products`, `industries`, `solutions`, `dealers`, `quote_requests`, `support_tickets`, `ticket_messages`) are already migrated with RLS enabled.
*   **Auth**: Role-based access control (`admin`, `editor`, `dealer`, `support`, `customer`) is wired through the `useRoles` hook.
*   **Performance**: All images are using `loading="lazy"` and optimized `aspect-ratio` containers to ensure high Core Web Vitals.

**I will now proceed with these final refinements one file at a time.**
