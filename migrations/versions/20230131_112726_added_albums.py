"""added albums

Revision ID: 0685b16e7e10
Revises: 802fcf8fc5db
Create Date: 2023-01-31 11:27:26.553607

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0685b16e7e10'
down_revision = '802fcf8fc5db'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('imageUrl', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    op.add_column('songs', sa.Column('albumId', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'songs', 'albums', ['albumId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'songs', type_='foreignkey')
    op.drop_column('playlists', 'albumId')
    op.drop_table('albums')
    # ### end Alembic commands ###