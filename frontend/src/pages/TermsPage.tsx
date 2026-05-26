export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: May 26, 2026</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">1. Acceptance of Terms</h2>
          <p>
            By creating an account or using the VMail web application ("Service") provided by VMail Solutions
            ("we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree
            to these terms, do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">2. Description of Service</h2>
          <p>
            VMail is a financial record-keeping tool designed for small business owners. It allows users to
            record income and expense transactions manually and, in future versions, via voice input with
            AI-assisted data extraction. VMail is a supplementary bookkeeping aid and is not a substitute
            for professional accounting software or financial advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">3. Your Account</h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>You must be at least 18 years old to create an account.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>You must provide accurate information when creating your account.</li>
            <li>You must notify us immediately of any unauthorised use of your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">4. Acceptable Use</h2>
          <p className="mb-3">You agree not to use VMail to:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Record fraudulent, misleading, or illegal financial transactions.</li>
            <li>Attempt to gain unauthorised access to other users' data or our systems.</li>
            <li>Reverse-engineer, copy, or redistribute any part of the Service.</li>
            <li>Use the Service in any way that violates applicable laws or regulations.</li>
            <li>Upload malicious content, scripts, or files.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">5. Your Data</h2>
          <p>
            You retain full ownership of the transaction data you enter into VMail. By using the Service,
            you grant us a limited licence to store and process your data solely for the purpose of
            providing the Service to you. We do not claim ownership of your financial records.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">6. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind, either
            express or implied. We do not warrant that the Service will be uninterrupted, error-free, or
            completely secure. VMail is not a certified accounting tool and should not be relied upon
            as the sole record of your business finances.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, VMail Solutions shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of or inability
            to use the Service, including but not limited to loss of data, loss of profits, or business
            interruption.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">8. Termination</h2>
          <p>
            You may stop using VMail and delete your account at any time. We reserve the right to suspend
            or terminate your account if you breach these Terms, with or without notice. Upon termination,
            your right to use the Service ceases immediately. Provisions regarding data ownership,
            disclaimers, and limitations of liability survive termination.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">9. Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. We will notify you of material changes by
            updating the "Last updated" date. Continued use of the Service after changes take effect
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">10. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with applicable law. Any disputes
            arising from these Terms or your use of the Service shall be resolved through good-faith
            negotiation before any formal proceedings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">11. Contact</h2>
          <p>
            For questions about these Terms, please contact us at{' '}
            <a href="mailto:support@vmailsolutions.com" className="text-primary-600 hover:underline">
              support@vmailsolutions.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
