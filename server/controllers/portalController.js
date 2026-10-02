const getPortalInfo = async (req, res) => {
  try {
    const portalInfo = {
      name: 'Anti-Cheat Assessment Platform',

      title: 'Secure Assessment Portal',

      description:
        'Take your assessments in a secure and monitored environment.',

      status: 'active',

      features: [
        {
          icon: '🔐',
          title: 'Secure Assessment',
          description: 'Protected testing environment',
        },
        {
          icon: '⏱️',
          title: 'Timed Tests',
          description: 'Complete assessments within the given time',
        },
        {
          icon: '📊',
          title: 'Instant Results',
          description: 'View your performance after submission',
        },
      ],

      instructions: [
        'Make sure you have a stable internet connection.',
        'Keep your camera and microphone ready if required.',
        'Do not refresh the page during the assessment.',
        'Do not switch tabs during the assessment.',
        'Complete the assessment within the given time.',
      ],
    };

    res.status(200).json({
      success: true,
      data: portalInfo,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to load portal information',
    });
  }
};

module.exports = {
  getPortalInfo,
};