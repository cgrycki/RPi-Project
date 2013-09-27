#  Chris Grycki
#  9/25/2013
#  Runs a server that :
#		- Receives input from client user to control a foam missile launcher attached via USB
#		- Receives messages from client user to display over the LCD on the GPIO
# 		- Streams video from the pi to the client
#		

import socket
import sys

# Base class for specific sockets
class sock:
	def __init__( self, port, srvSock = None ):
		try:
			# Create the socket for the video stream
			if srvSock is None:
				self.srvSock = socket.socket( socket.AF_INET, socket.SOCK_STREAM )
			else:
				self.srvSock = srvSock
		except socket.error , msg:
			print 'Failed to create socket. Error code: ' + str( msg[0] ) + ' , Error message : ' + msg[1]
			sys.exit()
		
		try:
			# Bind the socket to a public host
			srvSock.bind( ( socket.gethostname(), port ) )
		except socket.error , msg:
			print 'Failed to bind to port ' + str( port ) + '. Error code: ' + str( msg[0] ) + ' , Error message: ' + msg[1]
			sys.exit()
			
		# Become a server socket
		srvSock.list(5)

# Socket that handles the video stream
class videoSock( sock ):
		def __init__( self, port, srvSock = None )
			# Begin by calling the base class initializer
			sock.__init__( self, self.port, self.srvSock )
			# Proceed with logic for the video socket
			while 1:
				# Accept connections from outside
				( clientSocket, address ) = srvSock.accept()
				# Now do xyz
				
# Socket that handles messages				
class msgSock( sock ):
		def __init__( self, port, srvSock = None )
			# Begin by calling the base class initializer
			sock.__init__( self, self.port, self.srvSock )
			# Proceed with logic for the message socket
			while 1:
				# Accept connections from outside
				( clientSocket, address ) = srvSock.accept()
				# Now do xyz
				
# Socket that handles commands to the foam missile launcher
class cmdSock( sock ):
		def __init__( self, port, srvSock = None )
			# Begin by calling the base class initializer
			sock.__init__( self, self.port, self.srvSock )
			# Proceed with logic for the command socket
			while 1:
				# Accept connections from outside
				( clientSocket, address ) = srvSock.accept()
				# Now do xyz