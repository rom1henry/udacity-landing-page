// Sunco Init
Smooch.init({
	integrationId: '655752c4d99f34ed48c04bd7',
}).then(() => {
	var iframe = document.getElementById('web-messenger-container');
	var iframedocument = iframe.contentDocument || iframe.contentWindow.document;
	iframedocument.addEventListener(
		'click',
		function (evt) {
			initializeButton(iframedocument);
		},
		false
	);
});

Smooch.on('widget:opened', function () {
	if (!Smooch.getUser() || Smooch.getConversations().length === 0) {
		Smooch.createConversation({
			displayName: 'First Convo',
			description: 'How can we help you?',
		});
	}
});

function initializeButton(iframedocument) {
	var conversationFooter = iframedocument.getElementsByClassName('conversation-group-footer')[0];
	if (conversationFooter) {
		conversationFooter.innerHTML = '<button onclick=parent.createConversation()>New Conversation</button>';
	}
}
function createConversation() {
	if (Smooch.isOpened()) {
		Smooch.createConversation().then((conversation) => {
			Smooch.loadConversation(conversation.id);
		});
	}
}
