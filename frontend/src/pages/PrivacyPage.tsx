export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: May 26, 2026</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">1. Overview</h2>
          <p>
            VMail Solutions ("we", "our", or "us") operates the VMail web application. This Privacy Policy explains
            how we collect, use, and protect your personal information when you use our service. By using VMail,
            you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect the following categories of information:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Account information</span> — your email address and password (stored securely via Supabase Auth).</li>
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Transaction data</span> — amounts, categories, dates, notes, and customer/vendor names that you record.</li>
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Voice recordings</span> — audio files you submit for transcription (future feature). These are used solely for transcription and are not retained after processing.</li>
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Usage data</span> — basic technical information such as browser type and access times, used to maintain and improve the service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>To provide and operate the VMail service.</li>
            <li>To associate your financial records with your account.</li>
            <li>To process voice input and extract transaction data (future feature).</li>
            <li>To communicate important service updates or security notices.</li>
            <li>To improve the reliability and performance of the application.</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">4. Third-Party Services</h2>
          <p className="mb-3">VMail relies on the following third-party services to operate:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Supabase</span> — database, authentication, and file storage. Your data is stored on Supabase-managed infrastructure. See <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Supabase Privacy Policy</a>.</li>
            <li><span className="font-medium text-gray-800 dark:text-gray-200">AssemblyAI</span> (future) — speech-to-text transcription of voice input. Audio is transmitted securely and not retained after transcription.</li>
            <li><span className="font-medium text-gray-800 dark:text-gray-200">Google</span> — optional sign-in via Google OAuth. If you sign in with Google, we receive only your email address and profile name.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">5. Data Security</h2>
          <p>
            All data is transmitted over HTTPS. Passwords are hashed and never stored in plain text.
            Access to your transaction data is restricted to your account via authenticated API requests.
            While we take reasonable precautions, no system is completely secure and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">6. Data Retention</h2>
          <p>
            Your account and transaction data are retained for as long as your account is active.
            You may request deletion of your account and all associated data at any time by contacting us.
            Upon deletion, your data will be permanently removed within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">7. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your account and data.</li>
            <li>Export your transaction records.</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, contact us at the address below.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
            date at the top of this page. Continued use of VMail after changes constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@vmailsolutions.com" className="text-primary-600 hover:underline">
              support@vmailsolutions.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
